import cl from "classnames";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { api } from "../api";
import Navbar from "../common/components/Navbar";
import { RootState } from "../common/redux/store";
import Home from "../modules/showcase/Home.page";
import { socket } from "../common/lib/socket";
import { Message } from "../types";
import { PublicRoute } from "./PublicRoute";
import { UserRoute } from "./UserRoute";
import { allRoutes } from "./allRoutes";
import { chatActions } from "../common/redux/reducers/chat";
import { notificationActions } from "../common/redux/reducers/notifications";
import { userActions } from "../common/redux/reducers/user";

const chatAudioURL = "/audio/notify.mp3";

const chatAudio = new Audio(chatAudioURL);
chatAudio.crossOrigin = "anonymous";

const WebRoutes: React.FC = () => {
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const settings = useSelector((store: RootState) => store.settings);

  useEffect(() => {
    const audio = new Audio("/audio/notification2.ogg");
    socket.emit("chat:registerAllRooms");

    socket.on("chat:incomingMessage", (message: Message) => {
      // setMessages((p) => p.concat(message));
      dispatch(chatActions.addMessage({ roomName: message.roomName, message }));
      // dispatch(
      //   notificationActions.addNotification({
      //     id: new Date().toISOString(),
      //     type: "MessageReceived",
      //     data: {
      //       id: message.sender.id,
      //       message: message.message,
      //       name: message.sender.name,
      //     },
      //   })
      // );
    });

    socket.on("greet", (e: any) => {
      console.log("EVENT", e);
    });

    socket.on("room:IDSuccess", (id: string) => {
      dispatch(chatActions.addRoom(id));
      console.log("Room ID", id);
    });

    socket.emit("auth:registerUserSocket", (token: string) => {
      dispatch(userActions.logIn({ token }));
    });
    socket.on("notification:new", (s: any) => {
      audio.play();
      console.log("NOTIFFFF", s);
      dispatch(notificationActions.addNotification(s));
    });
  }, [dispatch]);

  return (
    <div className={cl("h-screen", { "bg-gray-900": settings.isDarkbg })}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {allRoutes.map((route) => {
            const Component = route.authProtected ? UserRoute : PublicRoute;
            return <Component path={route.path} element={route.element} />;
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default WebRoutes;
