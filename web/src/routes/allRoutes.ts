import { AuthRoutes } from "../modules/auth/Auth.routes";
import { ChatRoutes } from "../modules/chat/Chat.routes";
import { DashboardRoutes } from "../modules/dashboard/Dashboard.routes";
import { FriendsRoutes } from "../modules/friends/Friends.routes";
import { NotificationRoutes } from "../modules/notification/Notification.route";
import { ProfileRoutes } from "../modules/profile/Profile.routes";
import { ShowcaseRoutes } from "../modules/showcase/showcase.routes";

export const allRoutes = [
  ...AuthRoutes,
  ...DashboardRoutes,
  ...ShowcaseRoutes,
  ...FriendsRoutes,
  ...NotificationRoutes,
  ...ProfileRoutes,
  ...ChatRoutes,
];
