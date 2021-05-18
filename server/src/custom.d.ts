import "express-session";
import { Server } from "socket.io";

declare global {
  declare module Express {
    export interface Application {
      io: Server;
      sessionQIDtoSocketMap: Record<string, string>;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    qid: string;
  }
}
