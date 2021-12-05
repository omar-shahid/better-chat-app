import { RouteConfig } from "../../types";
import LoginPage from "./login/Login.page";
import RegisterPage from "./register/Register.page";

export const AuthRoutes: RouteConfig[] = [
  {
    path: "/register",
    element: <RegisterPage />,
    // authProtected: true,
  },
  {
    path: "/login",
    element: <LoginPage />,
    // authProtected: true,
  },
];
