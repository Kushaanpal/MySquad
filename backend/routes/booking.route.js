import express from "express";
import {
  checkAvailability,
  createBooking,
  getMyBookings,
  cancelBooking,     // ✅ new
  getAllBookings,    // ✅ admin use
  getBookingById, 
  updateBooking   // ✅ optional
} from "../controllers/booking.controller.js";
import userMiddleware from "../middleware/user.middleware.js";
// (If you have an admin middleware, you can import it here)

const router = express.Router();

// ✅ 1. Check availability of slots
router.get("/availability", checkAvailability);

// ✅ 2. Create a new booking (protected)
router.post("/create", userMiddleware, createBooking);

// ✅ 3. Get all bookings of logged-in user (protected)
router.get("/my", userMiddleware, getMyBookings);

// ✅ 4. Cancel a booking (protected)
router.delete("/:id", userMiddleware, cancelBooking);

// ✅ 5. (Optional) Get booking details by ID
router.get("/:id", userMiddleware, getBookingById);

// ✅ 6. (Optional) Get all bookings (admin only)
router.get("/", getAllBookings); // you can protect with adminMiddleware

router.put("/:id", userMiddleware, updateBooking);
export default router;
