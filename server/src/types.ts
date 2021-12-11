import { Application } from "express";
import { Server, Socket } from "socket.io";
import { Request } from "express";

export enum Events {
  Connection = "connection",
}

export interface EventClassConstructor {
  new (socket: Socket, app: Application, io: Server): EventClass;
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

export interface DecodedToken {
  id: string;
  socketID: string;
}

export interface SocketWithData extends Socket {
  data: {
    decodedToken: DecodedToken;
  };
}
