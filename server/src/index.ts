import jwt from "jsonwebtoken";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressSession from "express-session";
import http from "http";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";
import { Server, Socket } from "socket.io";
import { chatEvents } from "./events/Chat";
import "./models/Friend";
import notificationRoutes from "./routes/notificationRoutes";
import userRoutes from "./routes/userRoutes";
import { SocketWithData } from "./types";
import { getIPv4Address } from "./utils";
import { authEvents } from "./events/Auth";

dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGODB_URL = process.env.MONGO_DB_URL ?? "";

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const sessionStore = MongoStore.create({
  mongoUrl: MONGODB_URL,
});

const session = expressSession({
  secret: "TEST",
  name: "qid",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    sameSite: "lax",
    secure: false,
    httpOnly: true,
  },
  store: sessionStore,
});

const whitelist = ["http://localhost:3000", `http://${getIPv4Address()}:3000`];

const corsConfig: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
app.use(logger("dev"));
app.use(cors(corsConfig));

app.use(session);
app.use(express.json());
app.get("/", (_, res) => {
  res.send("Working");
});

app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);

const server = http.createServer(app);

/**
 *
 * SOCKET IMPLEMENTATION
 *
 */

const io = new Server(server, { cors: corsConfig });

app.io = io;
io.use((s, next) => {
  const socket = s as SocketWithData;

  const verifiedToken = jwt.verify(
    socket.handshake.auth.token,
    process.env.JWT_SECRET ?? ""
  );

  if (!verifiedToken) {
    console.log("UNAUTHORIZED --------------------------------");
    return socket.emit("auth:unauthorized");
  }

  (verifiedToken as any).socketID = socket.id;

  (s as SocketWithData).data = {
    decodedToken: verifiedToken as SocketWithData["data"]["decodedToken"],
  };

  return next();
});
io.on("connection", (socket: Socket) => {
  const s = socket as any;
  chatEvents(io, s);
  authEvents(io, s);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
