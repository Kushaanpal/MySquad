export default function VenueCard({ venue }) {
  // Handle location formatting
  let locationText = "Unknown Location";
  let mapsLink = null;

  if (venue.location) {
    if (typeof venue.location === "string") {
      locationText = venue.location;
    } else if (venue.location.coordinates) {
      const [lng, lat] = venue.location.coordinates;
      locationText = `Lat: ${lat}, Lng: ${lng}`;
      mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md flex items-center justify-between p-4 border hover:shadow-lg transition">
      {/* Venue Logo */}
      <div className="flex items-center space-x-4">
        <img
          src={venue.image || "/sports.jpg"}
          alt={venue.name}
          className="w-16 h-16 object-contain rounded-md"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {venue.name}
          </h2>

          {mapsLink ? (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline truncate w-52 block"
            >
              {locationText}
            </a>
          ) : (
            <p className="text-sm text-gray-500 truncate w-52">
              {locationText}
            </p>
          )}

          <p className="text-xs text-gray-400">{venue.sport}</p>
        </div>
      </div>

      {/* Distance + Button */}
      <div className="flex flex-col items-end">
        <p className="text-sm text-gray-500 mb-2">(2 km)</p>
        <button className="bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition">
          Book Now →
        </button>
      </div>
    </div>
  );
}
