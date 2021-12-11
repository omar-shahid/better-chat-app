import { RouteConfig } from "../../types";
import ChatPage from "./Chat.page";

export const ChatRoutes: RouteConfig[] = [
  {
    path: "/chat/:id",
    element: <ChatPage />,
    authProtected: true,
  },
];
