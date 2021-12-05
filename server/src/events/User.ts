import { Application } from "express";
import { Session, SessionData } from "express-session";
import { ObjectID } from "mongodb";
import { Server, Socket } from "socket.io";
import { sessionStore } from "..";
import Room from "../models/Room";
import User from "../models/User";
import { EventClass } from "../types";

class UserEvents implements EventClass {
  name: string;
  socket: Socket;
  app: Application;
  qid: string;
  io: Server;
  session: Session & Partial<SessionData>;
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

    this.session = (this.socket.handshake as any).session;
  }
  public Greet() {
    this.socket?.emit("an", "Coming from socket!");
  }
  private async getQid(sid: string): Promise<SessionData | any> {
    return new Promise((resolve, reject) => {
      sessionStore.get(sid, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(data?.qid);
      });
    });
  }
  public async InitiateChat(id: string) {
    await this.session.reload(async (err) => {
      if (err) console.log(err);
      if (!this.session.qid) {
        return this.socket.emit("notLoggedIn");
      }
      const room = await Room.findOne({
        users: { $all: [new ObjectID(this.session.qid), new ObjectID(id)] },
      });
      if (!room) return this.socket.emit("roomNotFound");

      this.socket.join(room.name);
      return this.io.to(this.socket.id).emit("roomIdSuccess", room.id);
    });
  }

  public async registerUserSocket(sid: string) {
    const qid = await this.getQid(sid);
    if (!qid) {
      return this.socket.emit("notLoggedIn");
    }
    this.session.qid = qid;
    this.session.save();

    console.log("SESSION", this.session);
    const currUser = await User.findById(this.session.qid);
    if (!currUser) {
      return this.socket.emit("notLoggedIn");
    }
    currUser.socket = this.socket.id ?? "";
    await currUser.save();
    return this.socket.emit("success");
  }

  public async sendMessage(roomId: string, message: string) {
    if (!this.session.qid) {
      return this.socket.emit("notLoggedIn");
    }
    const room = await Room.findById(roomId);
    if (!room) return this.socket.emit("roomNotFound");
    const newMessage = {
      sender: new ObjectID(this.session.qid),
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
