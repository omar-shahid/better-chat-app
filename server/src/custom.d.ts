import "express-session";
import { Server } from "socket.io";
import { DecodedToken } from "./types";

declare var process: {
  env: {
    MONGO_DB_URL: string;
  };
};
declare global {
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

declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
  }
}
