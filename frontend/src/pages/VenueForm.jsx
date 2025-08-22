import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VenueForm() {
  const [form, setForm] = useState({
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
    contactEmail: "",
    contactPhone: "",
  });

  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatLng({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation not allowed:", err.message);
      }
    );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/venues",
        {
          ...form,
          sportTypes: form.sportTypes.split(",").map((s) => s.trim()),
          amenities: form.amenities.split(",").map((a) => a.trim()),
          contact: {
            email: form.contactEmail,
            phone: form.contactPhone,
          },
          lat: latLng.lat,
          lng: latLng.lng,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Venue created successfully!");
      navigate("/venues");
    } catch (err) {
      console.error("Error creating venue:", err);
      toast.error(err.response?.data?.error || "Failed to create venue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🏟️ List Your Venue
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Venue Info */}
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Venue Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-24"
            />
            <input
              name="sportTypes"
              placeholder="Sports (e.g. Football, Badminton)"
              value={form.sportTypes}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Location & Pricing */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <input
              type="number"
              name="pricePerHour"
              placeholder="Price per hour"
              value={form.pricePerHour}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={form.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              name="amenities"
              placeholder="Amenities (e.g. Parking, Washroom)"
              value={form.amenities}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Timings */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <input
              type="time"
              name="openTime"
              value={form.openTime}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="time"
              name="closeTime"
              value={form.closeTime}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <input
              name="contactEmail"
              placeholder="Contact Email"
              value={form.contactEmail}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              name="contactPhone"
              placeholder="Contact Phone"
              value={form.contactPhone}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Location Preview */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <input
              value={latLng.lat || ""}
              placeholder="Latitude (auto-detected)"
              disabled
              className="border border-gray-200 p-3 rounded-lg bg-gray-100 text-gray-600"
            />
            <input
              value={latLng.lng || ""}
              placeholder="Longitude (auto-detected)"
              disabled
              className="border border-gray-200 p-3 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-300 shadow-md"
            >
              🚀 Submit Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
