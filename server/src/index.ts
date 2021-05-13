import MongoStore from "connect-mongo";
import cors from "cors";
import express from "express";
import expressSession from "express-session";
import sharedSession from "express-socket.io-session";
import http from "http";
import mongoose from "mongoose";
import logger from "morgan";
import { Server, Socket } from "socket.io";
import UserEvents from "./events/User";
import "./models/Friend";
import userRoutes from "./routes/userRoutes";
import { EventClassConstructor } from "./types";



const MONGODB_URL = "mongodb://localhost:27017/better-chat-app";
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
  store: MongoStore.create({
    mongoUrl: MONGODB_URL,
  }),
});


const whitelist = ["http://localhost:3000", "http://192.168.2.104:3000"];

const corsConfig: cors.CorsOptions = {
  origin:function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  } ,
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

const server = http.createServer(app);

/**
 *
 * SOCKET IMPLEMENTATION
 *
 */

const io = new Server(server, { cors: corsConfig });
io.use(sharedSession(session));
// io.use(socketIoLogger());
io.on("connection", (socket: Socket) => {
  console.log(socket.id, "connected");
  const eventClasses: Record<string, EventClassConstructor> = {
    user: UserEvents,
  };

  for (let eventClass in eventClasses) {
    const eventClassInit = new eventClasses[eventClass](socket, app, io);
    const events = eventClassInit.events;
    for (let event in events) {
      const finalEventName = `${eventClassInit.name}:${event}`;
      console.log(finalEventName);
      socket.on(finalEventName, events[event]);
    }
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
