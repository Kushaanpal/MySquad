import Venue from "../models/venue.model.js";
import mongoose from "mongoose";

// ✅ Create a new venue (when user clicks "Get Listed")
export const createVenue = async (req, res) => {
  try {
    const { name, description, sportTypes, address, city, state, pincode,
            coordinates, pricePerHour, capacity, amenities,
            openTime, closeTime, images, contact } = req.body;

    const venue = new Venue({
      owner: req.user._id, // assuming auth middleware attaches user
      name,
      description,
      sportTypes,
      address,
      city,
      state,
      pincode,
      location: {
        type: "Point",
        coordinates: coordinates || [0, 0], // [lng, lat]
      },
      pricePerHour,
      capacity,
      amenities,
      openTime,
      closeTime,
      images,
      contact,
    });

    const savedVenue = await venue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ message: "Server error while creating venue" });
  }
};

// ✅ Get all venues (for homepage listing)
export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate("owner", "username email");
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching venues" });
  }
};

// ✅ Get venue by ID (for details page)
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate("owner", "username email");
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching venue" });
  }
};

// ✅ Update venue (owner only)
export const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    if (venue.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(venue, req.body);
    const updatedVenue = await venue.save();
    res.json(updatedVenue);
  } catch (error) {
    res.status(500).json({ message: "Server error updating venue" });
  }
};

// ✅ Delete venue (owner only)
export const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    if (venue.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await venue.deleteOne();
    res.json({ message: "Venue deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting venue" });
  }
};
