import argon2 from "argon2";
import { Response } from "express";
import { ObjectID, ObjectId } from "mongodb";
import { v4 } from "uuid";
import { io } from "..";
import Friend, { FriendClass } from "../models/Friend";
import Notification from "../models/Notification";
import Request from "../models/Request";
import Room from "../models/Room";
import User from "../models/User";
import { ExpressRequest } from "../types";
import { createToken } from "../utils/createToken";
import {
  loginInputType,
  loginInputValidator,
} from "../validators/loginInputValidator";
import {
  registerInputType,
  registerInputValidator,
} from "../validators/registerInputValidator";

// const sessionQIDsocketMap: Record<string, string> = {}
export default class UserController {
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
        return res.status(500).json({ errors: ["Internal Server Error"] });
      }
    }
  }

  public async login(req: ExpressRequest<loginInputType>, res: Response) {
    const input = req.body;
    try {
      await loginInputValidator.validate(input, { abortEarly: false });
      const user = await User.findOne({ email: input.email });
      if (!user) return res.status(422).json({ errors: ["Invalid email"] });
      if (!(await argon2.verify(user.password, input.password)))
        return res.status(422).json({ errors: ["Invalid password"] });
      const token = createToken({ id: user.id });
      return res.json({
        success: true,
        token,
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
    const userId = req.decodedToken.id;
    const user = await User.findById(userId).select(
      "-rooms -password -requests -friends -socket"
    );
    io.to(req.decodedToken.socketID).emit(
      "greet",
      "This event is only for you " + user?.name
    );
    res.json({ profile: user });
  }

  public async rooms(req: ExpressRequest, res: Response) {
    const userId = req.decodedToken.id;

    const rooms = await User.findById(userId).select("rooms -_id");
    res.json({ rooms: rooms });
  }

  public async findFriends(req: ExpressRequest, res: Response) {
    const userId = req.decodedToken.id;

    const currUser = await User.findById(userId, "friends")
      .populate("friends", "users")
      .populate("request");

    // FIND PEOPLE WHO RECEIVED REQUEST OR THIS USER SENT REQUEST TO THEM
    const requestedUsers = (
      await Request.find({
        senderId: currUser?.id,
      })
    ).map((d) => d.recieverId);
    const userRequests = [
      ...(await Request.find({
        recieverId: currUser?.id,
      })),
    ].map((d) => d.senderId);

    const usersToBeExcluded = (
      currUser?.friends?.map((friend) => (friend as FriendClass).users) ?? []
    )
      .concat(requestedUsers)
      .concat(userRequests)
      .concat(currUser?.id); // In case user got no friends and DB filter won't have user id

    const users = await User.find({
      _id: { $nin: usersToBeExcluded?.flat() },
    }).select("name");
    res.json(users);
  }

  public logout(_: ExpressRequest, res: Response) {
    res.json({ success: true });
  }

  public async sendFriendRequest(
    req: ExpressRequest<{ id: string }>,
    res: Response
  ) {
    const userId = req.decodedToken.id;
    const { id: otherUserId } = req.body;
    if (!userId || !otherUserId)
      return res.status(400).json({ errors: ["Ids requried"] });
    const currUser = await User.findById(userId);
    const secondUser = await User.findById(otherUserId);

    if (!currUser || !secondUser)
      return res.status(400).json({ errors: ["Invalid Ids"] });

    const isRequestExists = await Request.findOne({
      senderId: currUser?.id,
      recieverId: secondUser?.id,
    });

    if (isRequestExists)
      return res.status(409).json({ errors: ["Request Already sent."] });

    const isRequestReceived = await Request.findOne({
      senderId: secondUser?.id,
      recieverId: currUser?.id,
    });

    if (isRequestReceived)
      return res.status(409).json({ errors: ["Request Already received."] });

    const newRequest = new Request({
      senderId: currUser?.id,
      recieverId: secondUser?.id,
    });
    await newRequest.save();

    currUser.requests = currUser.requests?.concat(newRequest);
    secondUser.requests = secondUser.requests?.concat(newRequest);

    await currUser.save();
    await secondUser.save();

    const notification = new Notification();
    notification.to = secondUser.id;
    notification.message = `${currUser.name} has sent you a friend request`;
    notification.link = `/requests`;

    await notification.save();
    io.to(secondUser.id ?? "").emit("notification:new", notification);

    return res.json({ success: true });
  }

  public async listFriendRequests(req: ExpressRequest, res: Response) {
    const sentRequests = await Request.find({
      senderId: new ObjectId(req.decodedToken.id),
    });
    const sentRequestUsers = await Promise.all(
      sentRequests.map(async (request) =>
        User.findById(request.recieverId).select("name")
      )
    );

    const recievedRequests = await Request.find({
      recieverId: new ObjectId(req.decodedToken.id),
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
    const { id: qid } = req.decodedToken;
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

    const notification = new Notification();
    notification.to = secondUser.id;
    notification.message = `${currUser.name} has accepted your request!`;
    notification.link = `/chat/${currUser.id}`;

    await notification.save();
    io.to(secondUser.id).emit("notification:new", notification);

    return res.json({ success: true });
  }

  public async listFriends(req: ExpressRequest, res: Response) {
    const { id: qid } = req.decodedToken;
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
    res.json(friendsData);
  }

  public async getPreviousMessages(
    req: ExpressRequest<{ friendUserId: string }>,
    res: Response
  ) {
    if (!req.body.friendUserId)
      return res.status(400).json({ error: "Provide Friend User ID" });
    const room = await Room.findOne({
      users: {
        $all: [
          new ObjectID(req.decodedToken.id),
          new ObjectID(req.body.friendUserId),
        ],
      },
    });
    const d = room?.chat?.reverse()?.map((chat) => {
      const obj: any = { ...chat };
      obj.sender = {
        id: chat.sender,
      };
      return obj;
    });
    if (!room) return res.status(401).json({ error: ["UnAuthorized"] });
    return res.json({ messages: d, roomName: room.name });
  }

  public async deleteRequest(
    req: ExpressRequest<{ id: string }>,
    res: Response
  ) {
    if (!req.body.id) return res.json({ errors: ["Id required"] });
    const request = await Request.findOne({
      recieverId: req.body.id,
      senderId: req.decodedToken.id,
    });
    if (!request) {
      return res.json({ error: ["request not found"] });
    }
    await request.remove();
    return res.json({ success: true });
  }

  public async rejectRequest(
    req: ExpressRequest<{ id: string }>,
    res: Response
  ) {
    if (!req.body.id) return res.json({ errors: ["Id required"] });
    const request = await Request.findOne({
      recieverId: req.decodedToken.id,
      senderId: req.body.id,
    });
    const currUser = await User.findById(req.body.id);
    if (!request) {
      return res.json({ error: ["request not found"] });
    }
    await request.remove();
    const notification = new Notification();
    notification.to = new ObjectId(req.body.id);
    notification.message = `${currUser?.name} has declined your request`;
    notification.link = "/friends/find";
    notification.isRead = false;

    await notification.save();

    io.to(req.body.id).emit("notification:new", notification);
    return res.json({ success: true });
  }
}
