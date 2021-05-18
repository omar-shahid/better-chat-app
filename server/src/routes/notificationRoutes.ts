import express from "express";
import NotificationController from "../controllers/NotificationController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// Authorized Routes
router.use(isAuthenticated);
router.get("/", NotificationController.getNotifications);

export default router;
