
import { MapPin, Navigation } from "lucide-react";

export default function VenueCard({ venue }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-2xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-40 w-full">
        <img
          src={venue.image || "/sports.jpg"}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        {/* Distance Badge */}
        <div className="absolute top-3 right-3 bg-white/90 text-sm font-semibold text-gray-700 px-3 py-1 rounded-full shadow-md">
          {venue.distance}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col space-y-3">
        {/* Venue Name */}
        <h2 className="text-xl font-bold text-gray-900 truncate">
          {venue.name}
        </h2>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm space-x-2">
          <MapPin className="w-4 h-4 text-green-600" />
          <span>{venue.displayLocation}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          {/* Sports tags (optional) */}
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

          {/* Book Now Button */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
 Book now
</button>
        </div>
      </div>
    </div>
  );
}
