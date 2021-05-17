import { Application } from "express";
import { ObjectID } from "mongodb";
import { Server, Socket } from "socket.io";
import Room from "../models/Room";
import User from "../models/User";
import { EventClass } from "../types";

class UserEvents implements EventClass {
  name: string;
  socket: Socket;
  app: Application;
  qid: string;
  io: Server;
  events = {
    greet: this.Greet.bind(this),
    initiateChat: this.InitiateChat.bind(this),
    sendMessage: this.sendMessage.bind(this),
    registerUserSocket: this.registerUserSocket.bind(this),
  };

  constructor(socket: Socket, app: Application, io: Server) {
    this.socket = socket;
    this.qid = (this.socket.handshake as any).session.qid;
    this.app = app;
    this.name = "user";
    this.io = io;
  }
  public Greet() {
    this.socket?.emit("an", "Coming from socket!");
  }
  public async InitiateChat(id: string) {
    if (!this.qid) {
      return this.socket.emit("notLoggedIn");
    }
    const room = await Room.findOne({
      users: { $all: [new ObjectID(this.qid), new ObjectID(id)] },
    });
    if (!room) return this.socket.emit("roomNotFound");

    this.socket.join(room.name);
    return this.io.to(this.socket.id).emit("roomIdSuccess", room.id);
  }

  public async registerUserSocket() {
    if (!this.qid) {
      return this.socket.emit("notLoggedIn");
    }
    const currUser = await User.findById(this.qid);
    if (!currUser) {
      return this.socket.emit("notLoggedIn");
    }
    currUser.socket = this.socket.id ?? "";
    await currUser.save();
    return this.socket.emit("success");
  }

  public async sendMessage(roomId: string, message: string) {
    if (!this.qid) {
      return this.socket.emit("notLoggedIn");
    }
    const room = await Room.findById(roomId);
    if (!room) return this.socket.emit("roomNotFound");
    const newMessage = {
      sender: new ObjectID(this.qid),
      message,
      createdAt: new Date(),
    };
    room.chat = room.chat?.concat(newMessage);
    await room.save();
    return this.io.sockets
      .in(room.name)
      .emit("user:incomingMessage", newMessage);
  }
}

export default UserEvents;
