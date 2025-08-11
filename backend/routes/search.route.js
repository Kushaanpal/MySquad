import express from "express";
import { searchPlayers, searchMatches } from "../controllers/search.controller.js";
import  userMiddleware  from "../middleware/user.middleware.js";

const router = express.Router();

// Search for players by skill/sport
router.get("/players",userMiddleware , searchPlayers);

// Search for matches by sport/location/date
router.get("/matches", userMiddleware, searchMatches);

export default router;
