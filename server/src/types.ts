import { Application } from "express";
import { Socket } from "socket.io";

export enum Events {
  Connection = "connection",
}

export interface EventClassConstructor {
  new (socket: Socket, app: Application): EventClass;
}
export interface EventClass {
  events: Record<string, (...args: any[]) => void>;
  name: string;
}
