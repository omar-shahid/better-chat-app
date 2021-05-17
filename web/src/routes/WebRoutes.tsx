import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/Chat";
import DashboardPage from "../pages/Dashboard";
import FindFriendsPage from "../pages/FindFriends";
import FriendsPage from "../pages/Friends";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";
import RequestsPage from "../pages/Requests";
import { PublicRoute } from "./PublicRoute";
import { UserRoute } from "./UserRoute";

const WebRoutes: React.FC = () => {
  // useEffect(() => {
  //   socket.on("notLoggedIn", () => {
  //     dispatch(userActions.logout());
  //   });
  // }, []);
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
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default WebRoutes;
