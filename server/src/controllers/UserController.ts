import argon2 from "argon2";
import { Response } from "express";
import { ObjectId } from "mongodb";
import { v4 } from "uuid";
import Friend, { FriendClass } from "../models/Friend";
import Request from "../models/Request";
import Room from "../models/Room";
import User from "../models/User";
import { ExpressRequest } from "../types";
import {
  loginInputType,
  loginInputValidator,
} from "../validators/loginInputValidator";
import {
  registerInputType,
  registerInputValidator,
} from "../validators/registerInputValidator";

class UserController {
  public async register(req: ExpressRequest<registerInputType>, res: Response) {
    const input = req.body;
    if (!input) return res.status(400).json({ errors: ["Provide input"] });
    try {
      await registerInputValidator.validate(input, { abortEarly: false });
      const hashedPass = await argon2.hash(input.password);
      const newUser = new User({
        name: input.name,
        email: input.email,
        password: hashedPass,
      });
      await newUser.save();
      return res.json({
        success: true,
      });
    } catch (e) {
      if (e.errors)
        return res.status(422).json({
          errors: e.errors,
        });
      else if (e.code === 11000)
        return res.status(409).json({ errors: ["Email already exists."] });
      else {
        console.log(e);
        return res.status(500).json({ errors: ["Internal Server Error"] });
      }
    }
  }

  public async login(req: ExpressRequest<loginInputType>, res: Response) {
    const input = req.body;
    try {
      await loginInputValidator.validate(input, { abortEarly: false });
      const user = await User.findOne({ email: input.email });
      if (!user)
        return res.status(422).json({ errors: ["Invalid email or password"] });
      if (!(await argon2.verify(user.password, input.password)))
        return res.status(422).json({ errors: ["Invalid email or password"] });
      req.session.qid = user.id;
      return res.json({
        success: true,
      });
    } catch (e) {
      if (e.errors)
        return res.status(422).json({
          errors: e.errors,
        });
      else {
        console.log(e);
        return res.status(500).json({ errors: ["Internal Server Error"] });
      }
    }
  }

  public async profile(req: ExpressRequest, res: Response) {
    const userId = req.session.qid;

    const user = await User.findById(userId).select("-rooms -password");
    res.json({ profile: user });
  }

  public async rooms(req: ExpressRequest, res: Response) {
    const userId = req.session.qid;

    const rooms = await User.findById(userId).select("rooms -_id");
    res.json({ rooms: rooms });
  }

  public async findFriends(req: ExpressRequest, res: Response) {
    const userId = req.session.qid;

    const currUser = await User.findById(userId, "friends")
      .populate("friends", "users")
      .populate("request");

    const usersToBeExcluded = (
      currUser?.friends?.map((friend) =>
        (friend as FriendClass).users.map((d) => d)
      ) ?? []
    ).concat(currUser?.id); // In case user got no friends and DB filter won't have user id

    const users = await User.find({
      _id: { $nin: usersToBeExcluded?.flat() },
    }).select("name");
    res.json(users);
  }

  public logout(req: ExpressRequest, res: Response) {
    req.session.destroy((err) => {
      res.clearCookie("qid");
      if (err) console.log(err);
      res.json({ success: true });
    });
  }

  public async sendFriendRequest(
    req: ExpressRequest<{ id: string }>,
    res: Response
  ) {
    const { qid } = req.session;
    const { id } = req.body;
    if (!id || !qid) return res.status(400).json({ errors: ["Ids requried"] });
    const currUser = await User.findById(qid);
    const secondUser = await User.findById(id);

    if (!currUser || !secondUser)
      return res.status(400).json({ errors: ["Ids requried"] });

    const newRequest = new Request({
      senderId: currUser?.id,
      recieverId: secondUser?.id,
    });
    await newRequest.save();

    currUser.requests = currUser.requests?.concat(newRequest);
    secondUser.requests = secondUser.requests?.concat(newRequest);

    await currUser.save();
    await secondUser.save();

    return res.json({ success: true });
  }

  public async listFriendRequests(req: ExpressRequest, res: Response) {
    const sentRequests = await Request.find({
      senderId: new ObjectId(req.session.qid),
    });
    const sentRequestUsers = await Promise.all(
      sentRequests.map(async (request) =>
        User.findById(request.recieverId).select("name")
      )
    );
    console.log(sentRequestUsers);

    const recievedRequests = await Request.find({
      recieverId: new ObjectId(req.session.qid),
    });

    const recievedRequestUsers = await Promise.all(
      recievedRequests.map(async (request) =>
        User.findById(request.senderId).select("name")
      )
    );

    res.json({
      sentRequests: sentRequestUsers,
      recievedRequests: recievedRequestUsers,
    });
  }

  public async acceptRequest(
    req: ExpressRequest<{ id: string }>,
    res: Response
  ) {
    const { id } = req.body;
    const { qid } = req.session;
    if (!id || !qid) return res.status(400).json({ errors: ["Ids requried"] });
    const currUser = await User.findById(qid);
    const secondUser = await User.findById(id);
    if (!currUser || !secondUser)
      return res.status(404).json({ errors: ["Users not found"] });
    const requestObj = await Request.findOne({
      senderId: secondUser?.id,
      recieverId: currUser.id,
    });
    if (!requestObj)
      return res
        .status(403)
        .json({ error: ["Get a friend request from the user first!"] });

    const userarr = [requestObj.senderId, requestObj.recieverId];

    const newRoom = new Room();
    newRoom.name = v4();
    newRoom.users = userarr;
    await newRoom.save();

    const newFriendConnection = new Friend({
      users: userarr,
      roomId: newRoom.id,
    });

    await newFriendConnection.save();
    currUser.friends = currUser.friends?.concat(newFriendConnection.id);
    currUser.requests = currUser.requests?.filter(
      (request) =>
        //@ts-ignore
        !request._id.equals(requestObj)
    );
    secondUser.friends = secondUser.friends?.concat(newFriendConnection.id);
    secondUser.requests = secondUser.requests?.filter(
      (request) =>
        //@ts-ignore
        !request._id.equals(requestObj)
    );

    await currUser.save();
    await secondUser.save();
    await requestObj.remove();

    return res.json({ success: true });
  }

  public async listFriends(req: ExpressRequest, res: Response) {
    const { qid } = req.session;
    const friends = await User.findById(qid)
      .select("friends -_id")
      .populate("friends", "users -_id")
      .exec();

    const friendsArr = (
      friends?.friends?.map((arr) => {
        return (arr as FriendClass)?.users.filter(
          (user: any) => !user._id.equals(qid)
        );
      }) ?? [[]]
    ).flat();
    const friendsData = await Promise.all(
      friendsArr.map((friend) => User.findById(friend).select("name"))
    );
    console.log(friendsArr);
    res.json(friendsData);
  }
}

export default new UserController();
