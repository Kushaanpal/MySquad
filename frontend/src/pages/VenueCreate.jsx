import { useState } from "react";
import { MapPin, Phone, Mail, DollarSign, Users, Clock, ImagePlus } from "lucide-react";

export default function VenueCreate() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sportTypes: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pricePerHour: "",
    capacity: "",
    amenities: "",
    openTime: "06:00",
    closeTime: "22:00",
    phone: "",
    email: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting venue:", formData);
    // TODO: Call API here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Create Your Venue
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Fill in the details to list your sports venue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Venue Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Venue Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="E.g. PlayArena Turf"
              required
            />
          </div>

          {/* Sport Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">Sport Type</label>
            <input
              type="text"
              name="sportTypes"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Football, Badminton"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <MapPin size={16} /> Address
            </label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Street, Area, Landmark"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold mb-2">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Bangalore"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold mb-2">State</label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Karnataka"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-semibold mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="560001"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <DollarSign size={16} /> Price Per Hour
            </label>
            <input
              type="number"
              name="pricePerHour"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="500"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Users size={16} /> Capacity
            </label>
            <input
              type="number"
              name="capacity"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="20"
            />
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Amenities</label>
            <input
              type="text"
              name="amenities"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Parking, Washroom, Lighting"
            />
          </div>

          {/* Timing */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Clock size={16} /> Open Time
            </label>
            <input
              type="time"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Clock size={16} /> Close Time
            </label>
            <input
              type="time"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Phone size={16} /> Contact Number
            </label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="venue@gmail.com"
            />
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <ImagePlus size={16} /> Upload Images
            </label>
            <input
              type="file"
              multiple
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition"
            >
              Create Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
