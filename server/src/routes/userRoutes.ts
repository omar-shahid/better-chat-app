import express from "express";
import UserController from "../controllers/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);

// Authorized Routes
userRoutes.use(isAuthenticated);
userRoutes.get("/profile", userController.profile);
userRoutes.get("/rooms", userController.rooms);
userRoutes.get("/friends/find", userController.findFriends);
userRoutes.post("/logout", userController.logout);
userRoutes.post("/requests/send", userController.sendFriendRequest);
userRoutes.post("/requests/accept", userController.acceptRequest);
userRoutes.post("/requests/reject", userController.rejectRequest);
userRoutes.post("/requests/delete", userController.deleteRequest);
userRoutes.get("/requests/list", userController.listFriendRequests);
userRoutes.get("/friends", userController.listFriends);
userRoutes.post("/messages/prev", userController.getPreviousMessages);
