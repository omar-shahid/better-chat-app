import { RouteConfig } from "../../types";
import ProfilePage from "./Profile.page";

export const ProfileRoutes: RouteConfig[] = [
  {
    path: "/profile",
    element: <ProfilePage />,
    authProtected: true,
  },
];
