import Venue from "../models/venue.model.js";

// ✅ Helper: reverse geocode coords -> city/state
const getCityStateFromCoords = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const res = await fetch(url, {
      headers: { "User-Agent": "MySquadApp/1.0 (mysquad@example.com)" }, // required by Nominatim
    });

    if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);

    const data = await res.json();

    return {
      city:
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "",
      state: data.address.state || "",
    };
  } catch (err) {
    console.error("Reverse geocoding failed:", err.message);
    return { city: "", state: "" };
  }
};

// Create a new venue
export const createVenue = async (req, res) => {
  try {
    // Ensure user is coming from JWT middleware
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      name,
      description,
      sportTypes,
      address,
      city,
      state,
      pincode,
      pricePerHour,
      capacity,
      amenities,
      openTime,
      closeTime,
      images,
      contact,
      lat,
      lng,
    } = req.body;

    // Validate required fields
    if (!name || !address || !pricePerHour || !lat || !lng) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newVenue = new Venue({
      owner: req.user._id, // comes from JWT middleware
      name,
      description,
      sportTypes,
      address,
      city,
      state,
      pincode,
      pricePerHour,
      capacity,
      amenities,
      openTime,
      closeTime,
      images,
      contact,
      location: {
        type: "Point",
        coordinates: [lng, lat], // GeoJSON requires [lng, lat]
      },
    });

    await newVenue.save();
    res.status(201).json(newVenue);
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ error: error.message });
  }
};


// ✅ Get all venues (already contains city/state in DB)
export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate("owner", "username email");
    res.json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Server error fetching venues" });
  }
};

// ✅ Get venue by ID
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate(
      "owner",
      "username email"
    );
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching venue" });
  }
};

// ✅ Update venue
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

// ✅ Delete venue
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
