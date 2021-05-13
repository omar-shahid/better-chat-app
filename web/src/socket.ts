import socketIOClient from "socket.io-client";

export const socket = socketIOClient.io(
  process.env.PRODUCTION_BACKEND_URL ?? process.env.REACT_APP_BACKEND_URL ?? "",
  {
    withCredentials: true,
  }
);
