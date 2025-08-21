import express from "express";
import {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} from "../controllers/venue.controller.js";
import userMiddleware  from "../middleware/user.middleware.js"; // ✅ Auth middleware

const router = express.Router();

// ✅ Public routes
router.get("/", getVenues);           // get all venues
router.get("/:id", getVenueById);     // get single venue by id

// ✅ Protected routes
router.post("/", userMiddleware, createVenue);      // create venue
router.put("/:id", userMiddleware, updateVenue);    // update venue
router.delete("/:id", userMiddleware, deleteVenue); // delete venue

export default router;
