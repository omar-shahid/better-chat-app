import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/login", UserController.login);
router.get("/login", UserController.login);

export default router;
