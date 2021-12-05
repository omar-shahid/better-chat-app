import { RouteConfig } from "../../types";
import ChatPage from "./Chat.page";

export const ChatRoutes: RouteConfig[] = [
  {
    path: "/chat",
    element: <ChatPage />,
    authProtected: true,
  },
];
