import { ObjectID } from "mongodb";
import { Server } from "socket.io";
import Room from "../models/Room";
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
    return io.to(socket.id).emit("room:IDSuccess", room.id);
  }

  async function sendMessage(roomId: string, message: string) {
    const room = await Room.findById(roomId);
    if (!room) return socket.emit("room:NotFound");
    const newMessage = {
      sender: new ObjectID(socket.data.decodedToken.id),
      message,
      createdAt: new Date(),
    };
    room.chat = room.chat?.concat(newMessage);
    await room.save();
    return io.sockets.in(room.name).emit("chat:incomingMessage", newMessage);
  }

  socket.on("chat:initiate", initiateChatRoom);
  socket.on("chat:sendMessage", sendMessage);
};