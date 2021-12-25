import socketIOClient from "socket.io-client";
import { store } from "../redux/store";

export const socket = socketIOClient.io(
  process.env.REACT_APP_PROD_API_URL ??
    process.env.REACT_APP_BACKEND_IP_URL ??
    process.env.REACT_APP_BACKEND_URL ??
    "",
  {
    auth: (cb) =>
      cb({
        token: store.getState().user.token,
      }),

    transports: ["websocket"],
  }
);
