import "express-session";
import { Server } from "socket.io";
import { DecodedToken } from "./types";
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      JWT_SECRET: string;
      REACT_APP_URL: string;
    }
  }
  module Express {
    export interface Request {
      decodedToken: DecodedToken;
    }
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
