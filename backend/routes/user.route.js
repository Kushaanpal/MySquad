import express from 'express';
import { registerUser, loginUser,getUserProfile,updateUserProfile, getNearbyUsers } from '../controllers/user.controller.js';
import userMiddleware from '../middleware/user.middleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/profile", userMiddleware, getUserProfile);
router.put("/profile", userMiddleware, updateUserProfile);
router.post("/nearby", userMiddleware, getNearbyUsers);

export default router;
