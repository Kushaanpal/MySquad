import React from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function MatchCard({ match, onJoined }) {
  const joinMatch = async () => {
    try {
      await api.post(`/matches/${match._id}/join`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Joined match successfully!");
      if (onJoined) onJoined(); // Refresh matches list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join match");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      {/* Match Image */}
      {match.image && (
        <img
          src={
            match.image.startsWith("http")
              ? match.image
              : `http://localhost:4001/${match.image}`
          }
          alt={match.title}
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}

      {/* Match Details */}
      <h2 className="text-xl font-bold mb-1">{match.title}</h2>
      <p>Sport: {match.sport}</p>
      <p>Date: {new Date(match.date).toLocaleDateString()}</p>
      <p>Players: {match.participants?.length || 0} / {match.maxPlayers || "∞"}</p>

      {/* Join Button */}
      <button
        onClick={joinMatch}
        className="mt-3 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded"
      >
        Join Match
      </button>
    </div>
  );
}
