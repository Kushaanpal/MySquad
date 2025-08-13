import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Axios instance
import toast from "react-hot-toast";

export default function CreateMatch() {
  const [title, setTitle] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Get location automatically
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
          toast.success("Location detected!");
        },
        () => {
          toast.error("Unable to fetch location");
        }
      );
    } else {
      toast.error("Geolocation not supported");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      toast.error("Please detect location before creating match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("sport", sport);
      formData.append("date", date);
      formData.append("description", description);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      if (image) formData.append("image", image);

      await api.post("/matches/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Match created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create match");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        <h1 className="text-3xl font-bold">Create a Match</h1>

        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Sport</label>
          <input
            type="text"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-green-400"
            rows="3"
          />
        </div>

        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={getLocation}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Detect Location
          </button>
          {latitude && longitude && (
            <span className="text-green-400 text-sm">
              📍 {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="block w-full text-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
        >
          Create Match
        </button>
      </form>
    </div>
  );
}
