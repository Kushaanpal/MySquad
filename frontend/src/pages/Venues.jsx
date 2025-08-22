import { useEffect, useState } from "react";
import api from "../utils/api";
import VenueCard from "../components/VenueCard";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";

// ✅ Haversine formula to calculate distance in km
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371; // radius of Earth in km
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
    // ✅ Get user location
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

    // ✅ Fetch venues
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

  // ✅ Preprocess venues with distance
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
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Loading venues...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Nearby Venues</h1>
          <p className="text-gray-500 text-sm">
            Find and book your favorite sports venues
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search venues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-60 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="distance">Sort by Distance</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Venue Grid */}
      {processedVenues.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {processedVenues.map((venue) => (
            <div
              key={venue._id}
              className="transform transition hover:-translate-y-2 hover:shadow-lg"
            >
              <VenueCard venue={venue} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No venues found 🚫
        </div>
      )}
    </div>
  );
}
