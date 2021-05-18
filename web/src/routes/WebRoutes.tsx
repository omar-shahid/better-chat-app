import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { api } from "../api";
import { RootState } from "../global/store";
import ChatPage from "../pages/Chat";
import DashboardPage from "../pages/Dashboard";
import FindFriendsPage from "../pages/FindFriends";
import FriendsPage from "../pages/Friends";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Notifications from "../pages/Notifications";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";
import RequestsPage from "../pages/Requests";
import { socket } from "../socket";
import { Message } from "../types";
import { PublicRoute } from "./PublicRoute";
import { UserRoute } from "./UserRoute";

const chatAudioURL = "/audio/notify.mp3";

const chatAudio = new Audio(chatAudioURL);
chatAudio.crossOrigin = "anonymous";

const WebRoutes: React.FC = () => {
  const user = useSelector((store: RootState) => store.user);
  const { data } = useQuery("friends", api.friends.listFriends, {
    enabled: user.isLoggedIn,
  }); //
  useEffect(() => {
    if (user.isLoggedIn && data?.length)
      data.forEach((friend) => {
        socket.emit("user:initiateChat", friend._id);
      });
  }, [data, user.isLoggedIn]);

  useEffect(() => {
    socket.on("user:incomingMessage", (message: Message) => {
      if (message.sender !== user.id) chatAudio.play();
    });
  }, [user.id]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <PublicRoute path="/register" element={<RegisterPage />} />
          <PublicRoute path="/login" element={<LoginPage />} />
          <UserRoute path="/dashboard" element={<DashboardPage />} />
          <UserRoute path="/friends/find" element={<FindFriendsPage />} />
          <UserRoute path="/profile" element={<ProfilePage />} />
          <UserRoute path="/requests" element={<RequestsPage />} />
          <UserRoute path="/friends" element={<FriendsPage />} />
          <UserRoute path="/chat/:id" element={<ChatPage />} />
          <UserRoute path="/notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default WebRoutes;
