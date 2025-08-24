import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VenueCard({ venue }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-2xl transition-all duration-300">
      {/* Image Section */}
      <div
        className="relative h-40 w-full cursor-pointer"
        onClick={() => navigate(`/venues/${venue._id}`)}
      >
        <img
          src={venue.image || "/sports.jpg"}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 text-sm font-semibold text-gray-700 px-3 py-1 rounded-full shadow-md">
          {venue.distance || "Nearby"}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col space-y-3">
        <h2 className="text-xl font-bold text-gray-900 truncate">
          {venue.name}
        </h2>

        <div className="flex items-center text-gray-600 text-sm space-x-2">
          <MapPin className="w-4 h-4 text-green-600" />
          <span>{venue.displayLocation || `${venue.city}, ${venue.state}`}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          {venue.sports && venue.sports.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {venue.sports.slice(0, 2).map((sport, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                >
                  {sport}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            {/* Navigate to venue details */}
            <button
              onClick={() => navigate(`/venues/${venue._id}`)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              View
            </button>

            {/* Navigate to booking page */}
            <button
              onClick={() => navigate(`/venues/${venue._id}/book`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
