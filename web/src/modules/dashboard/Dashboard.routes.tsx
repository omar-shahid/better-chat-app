import React from "react";
import { RouteConfig } from "../../types";
import ChatPage from "../chat/Chat.page";
import FriendRequestsPage from "../friends/FriendRequests.page";
import Notifications from "../notification/Notifications.page";
import ProfilePage from "../profile/Profile.page";
import DashboardPage from "./Dashboard.page";

export const DashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
    authProtected: true,
  },

  {
    path: "/requests",
    element: <FriendRequestsPage />,
    authProtected: true,
  },
];
