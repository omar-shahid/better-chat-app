import { Socket } from "socket.io";
import { Application } from "express";
import { EventClass } from "src/types";

class UserEvents implements EventClass {
  name: string;
  socket: Socket;
  app: Application;
  events = { greet: this.Greet.bind(this) };

  constructor(socket: Socket, app: Application) {
    this.socket = socket;
    this.app = app;
    this.name = "user";
  }
  public Greet() {
    console.log("Greetings");
    this.socket?.emit("an", "Coming from socket!");
  }
}

export default UserEvents;
