import { RouteConfig } from "../../types";
import Home from "./Home.page";

export const ShowcaseRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Home />,
    authProtected: true,
  },
];
