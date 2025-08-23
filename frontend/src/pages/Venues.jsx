import { useEffect, useState } from "react";
import api from "../utils/api";
import VenueCard from "../components/VenueCard";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";

// ✅ Haversine formula to calculate distance in km
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("distance");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation not allowed:", err.message);
      }
    );

    const fetchVenues = async () => {
      try {
        const res = await api.get("/venues");
        setVenues(res.data);
      } catch (err) {
        console.error("Error fetching venues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // ✅ Preprocess venues
  const processedVenues = venues
    .map((venue) => {
      let distance = null;
      if (
        userLocation &&
        venue.location &&
        venue.location.coordinates.length === 2
      ) {
        const [lng, lat] = venue.location.coordinates;
        distance = getDistanceFromLatLon(
          userLocation.lat,
          userLocation.lng,
          lat,
          lng
        ).toFixed(1);
      }
      return {
        ...venue,
        displayLocation:
          venue.city && venue.state
            ? `${venue.city}, ${venue.state}`
            : "Unknown Location",
        distance: distance ? `${distance} km` : "N/A",
        distanceValue: distance ? parseFloat(distance) : Infinity,
      };
    })
    .filter((venue) =>
      venue.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "distance") return a.distanceValue - b.distanceValue;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400 text-lg animate-pulse">
        Fetching venues near you...
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto bg-black min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-green-500 tracking-tight">
            Nearby Venues
          </h1>
          <p className="text-gray-400 mt-1">
            Explore, compare & book your favorite sports venues instantly
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3 mt-6 sm:mt-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search venues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-2.5 w-64 border border-gray-700 rounded-full shadow-sm bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-4 top-2.5 text-gray-400 w-5 h-5" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-12 pr-4 py-2.5 border border-gray-700 rounded-full shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="distance">Sort by Distance</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Venue Grid */}
      {processedVenues.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {processedVenues.map((venue) => (
            <div
              key={venue._id}
              className="transform transition hover:-translate-y-2 hover:shadow-2xl duration-300"
            >
              <VenueCard venue={venue} theme="dark" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 text-gray-400">
          <MapPin className="w-10 h-10 mb-3 text-gray-500" />
          <p className="text-lg font-medium">No venues found 🚫</p>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
