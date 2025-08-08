import express from "express";
import { getAllNotifications, markAsRead } from "../controllers/notification.controller.js";
import  userMiddleware  from "../middleware/user.middleware.js";

const router = express.Router();

router.get("/", userMiddleware, getAllNotifications);
router.post("/read/:id", userMiddleware, markAsRead);

export default router;
