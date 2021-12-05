import { RouteConfig } from "../../types";
import Notifications from "./Notifications.page";

export const NotificationRoutes: RouteConfig[] = [
  {
    path: "/notifications",
    element: <Notifications />,
    authProtected: true,
  },
];
