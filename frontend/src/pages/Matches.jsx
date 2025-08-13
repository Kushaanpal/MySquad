import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import MatchCard from "../components/MatchCard";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    try {
      const res = await api.get("/matches");
      setMatches(res.data);
    } catch {
      toast.error("Failed to load matches");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Available Matches</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match._id} match={match} onJoined={fetchMatches} />
        ))}
      </div>
    </div>
  );
}
