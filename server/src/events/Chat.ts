import { ObjectID } from "mongodb";
import { Server } from "socket.io";
import { FriendClass } from "../models/Friend";
import Room from "../models/Room";
import User from "../models/User";
import { SocketWithData } from "../types";

export const chatEvents = (io: Server, socket: SocketWithData) => {
  async function initiateChatRoom(otherUserId: string) {
    const room = await Room.findOne({
      users: {
        $all: [
          new ObjectID(socket.data.decodedToken.id),
          new ObjectID(otherUserId),
        ],
      },
    });
    console.log(room);
    if (!room) return socket.emit("room:notFound");

    socket.join(room.name);
    return io.to(socket.id).emit("room:IDSuccess", room.name);
  }

  async function sendMessage(roomName: string, message: string) {
    const room = await Room.findOne({ name: roomName });
    if (!room) return socket.emit("room:NotFound");
    const newMessage = {
      sender: new ObjectID(socket.data.decodedToken.id),
      message,
      createdAt: new Date(),
    };
    room.chat = room.chat?.concat(newMessage);
    const user = await User.findById(newMessage.sender);

    await room.save();
    return io.sockets.in(room.name).emit("chat:incomingMessage", {
      ...newMessage,
      roomName: roomName,
      sender: {
        id: newMessage.sender,
        name: user?.name,
      },
    });
  }

  async function registerAllRooms() {
    const id = socket.data.decodedToken.id;
    const friends = await User.findById(id)
      .select("friends -_id")
      .populate("friends", "users -_id")
      .exec();
    const friendsArr = (
      friends?.friends?.map((arr) => {
        return (arr as FriendClass)?.users.filter(
          (user: any) => !user._id.equals(id)
        );
      }) ?? [[]]
    ).flat();
    const friendsData = await Promise.all(
      friendsArr.map((friend) => User.findById(friend).select("_id"))
    );
    friendsData.forEach((friend) => initiateChatRoom(friend?._id!));
    console.log(friendsData);
  }

  socket.on("chat:initiate", initiateChatRoom);
  socket.on("chat:sendMessage", sendMessage);
  socket.on("chat:registerAllRooms", registerAllRooms);
};
