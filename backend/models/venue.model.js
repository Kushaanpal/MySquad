import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // the user who clicked "Get Listed"
    },

    // Basic info
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    sportTypes: [{ type: String, trim: true }], // e.g. ["football", "badminton"]

    // Where is it?
    address: { type: String, required: true, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },

    // Geo location (for nearby search)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
        default: [0, 0],
      },
    },

    // Ops & pricing
    pricePerHour: { type: Number, required: true, min: 0 },
    capacity: { type: Number, default: 0 }, // max players/people
    amenities: [{ type: String, trim: true }], // e.g. ["parking", "washroom", "locker", "lighting"]

    // Hours (simple for MVP)
    openTime: { type: String, default: "06:00" },  // "HH:mm"
    closeTime: { type: String, default: "22:00" },

    // Media & contact
    images: [{ type: String }], // file paths or URLs
    contact: {
      phone: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },

    // Admin & stats
    isVerified: { type: Boolean, default: false },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes
venueSchema.index({ location: "2dsphere" });
venueSchema.index({ name: "text", address: "text", city: "text" });

const Venue = mongoose.model("Venue", venueSchema);
export default Venue;
