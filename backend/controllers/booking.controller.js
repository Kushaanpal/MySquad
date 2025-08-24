import Booking from "../models/booking.model.js";
import Venue from "../models/venue.model.js";

// ✅ 1. Check slot availability
export const checkAvailability = async (req, res) => {
  try {
    const { venueId, date, startTime, endTime } = req.query;

    if (!venueId || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const conflict = await Booking.findOne({
      venue: venueId,
      date: new Date(date),
      startTime,
      endTime,
      status: { $ne: "cancelled" },
    });

    if (conflict) {
      return res.status(200).json({ available: false, message: "Slot already booked" });
    }

    res.status(200).json({ available: true, message: "Slot available" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ 2. Create a booking
export const createBooking = async (req, res) => {
  try {
    const { venueId, date, startTime, endTime, price } = req.body;

    if (!venueId || !date || !startTime || !endTime || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if venue exists
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // Ensure no duplicate booking
    const conflict = await Booking.findOne({
      venue: venueId,
      date: new Date(date),
      startTime,
      endTime,
      status: { $ne: "cancelled" },
    });

    if (conflict) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    const booking = new Booking({
      user: req.user._id,
      venue: venueId,
      date,
      startTime,
      endTime,
      price,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ 3. Get logged-in user’s bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("venue", "name location")
      .sort({ date: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ 4. Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({ _id: id, user: req.user._id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ 5. Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("user", "name email")
      .populate("venue", "name location");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Restrict users from seeing others' bookings unless they’re admin
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ 6. Get all bookings (Admin use)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("venue", "name location")
      .sort({ date: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime, price } = req.body;

    const booking = await Booking.findOne({ _id: id, user: req.user._id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // update only provided fields
    if (date) booking.date = new Date(date);
    if (startTime) booking.startTime = startTime;
    if (endTime) booking.endTime = endTime;
    if (price) booking.price = price;

    await booking.save();

    res.json({ message: "Booking updated successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};