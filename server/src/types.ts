import { Application } from "express";
import { Socket } from "socket.io";
import { Request } from "express";

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

export type ExpressRequest<
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  P = any
> = Request<P, {}, ReqBody, ReqQuery>;
