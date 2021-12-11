import { Server } from "socket.io";
import { SocketWithData } from "../types";
import jwt from "jsonwebtoken";

export const authEvents = (_: Server, socket: SocketWithData) => {
  async function registerUserSocket() {
    const decodedToken = jwt.decode(socket.handshake.auth.token);

    (decodedToken as any).socketID = socket.id;
    (socket as SocketWithData).data.decodedToken =
      decodedToken as SocketWithData["data"]["decodedToken"];
  }

  socket.on("auth:registerUserSocket", registerUserSocket);
};
