import cl from "classnames";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
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

const chatAudioURL = "/audio/notify.mp3";

const chatAudio = new Audio(chatAudioURL);
chatAudio.crossOrigin = "anonymous";

const WebRoutes: React.FC = () => {
  const user = useSelector((store: RootState) => store.user);
  const settings = useSelector((store: RootState) => store.settings);
  const { refetch } = useQuery("friends", api.friends.listFriends, {
    enabled: false,
  }); //
  useEffect(() => {
    if (user.isLoggedIn)
      refetch().then((data) =>
        data?.data?.forEach((friend) => {
          socket.emit("user:initiateChat", friend._id);
        })
      );
  }, [refetch, user.isLoggedIn]);

  useEffect(() => {
    socket.on("user:incomingMessage", (message: Message) => {
      if (message.sender !== user.id)
        chatAudio.play().catch((e) => console.log("Audio Error", e));
    });
  }, [user]);

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
