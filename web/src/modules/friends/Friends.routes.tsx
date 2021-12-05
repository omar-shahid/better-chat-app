import FindFriendsPage from "./FindFriends.page";
import FriendsPage from "./Friends.page";
import { RouteConfig } from "../../types";

export const FriendsRoutes: RouteConfig[] = [
  {
    path: "/friends",
    authProtected: true,
    element: <FriendsPage />,
  },
  {
    path: "/friends/find",
    authProtected: true,
    element: <FindFriendsPage />,
  },
];
