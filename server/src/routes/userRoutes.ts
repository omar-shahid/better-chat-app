import express from "express";
import UserController from "../controllers/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Authorized Routes
router.use(isAuthenticated);
router.get("/profile", UserController.profile);
router.get("/rooms", UserController.rooms);
router.get("/friends/find", UserController.findFriends);
router.post("/logout", UserController.logout);

export default router;
