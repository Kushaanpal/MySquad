import { useEffect, useState } from "react";
import api from "../utils/api";
import VenueCard from "../components/VenueCard";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Helper: reverse geocode coordinates to human-readable address
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      return data.display_name || `Lat: ${lat}, Lng: ${lng}`;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return `Lat: ${lat}, Lng: ${lng}`;
    }
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await api.get("/venues");

        // 🟢 Clean location data + reverse geocode coordinates
        const formattedVenues = await Promise.all(
          res.data.map(async (venue) => {
            let locationText = "Unknown Location";
            let mapsLink = null;

            if (venue.location) {
              if (typeof venue.location === "string") {
                locationText = venue.location;
              } else if (venue.location.coordinates) {
                const [lng, lat] = venue.location.coordinates;
                mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
                locationText = await getAddressFromCoords(lat, lng);
              }
            }

            return {
              ...venue,
              displayLocation: locationText,
              mapsLink,
            };
          })
        );

        setVenues(formattedVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search venues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Venues List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading venues...</p>
      ) : filteredVenues.length === 0 ? (
        <p className="text-center text-gray-500">No venues found 😢</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
