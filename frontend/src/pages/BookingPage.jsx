import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingPage() {
  const { id } = useParams(); // venueId
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);

  const [date, setDate] = useState("");
  const [sport, setSport] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Fetch venue details
  useEffect(() => {
    axios.get(`http://localhost:4001/api/venues/${id}`)
      .then(res => {
        setVenue(res.data);
        if (res.data.sports?.length > 0) setSport(res.data.sports[0]);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      const res = await axios.post(
        "http://localhost:4001/api/bookings/create",
        {
          venueId: venue._id,
          date,
          startTime,
          endTime,
          price: 500, // Example, can calculate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Booking Successful!");
      console.log(res.data);
      navigate("/"); // Redirect after booking
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  if (!venue) return <p className="text-center">Loading venue...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Book {venue.name}</h2>

      <img src={venue.image} alt={venue.name} className="w-full h-56 object-cover rounded-lg mb-4" />

      {/* Date Picker */}
      <label className="block text-sm font-medium">Select Date</label>
      <input
        type="date"
        className="w-full border rounded p-2 mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Sports Selection */}
      {venue.sports && (
        <>
          <label className="block text-sm font-medium">Select Sport</label>
          <select
            className="w-full border rounded p-2 mb-3"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            {venue.sports.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Time Slots */}
      <label className="block text-sm font-medium">Start Time</label>
      <input
        type="time"
        className="w-full border rounded p-2 mb-3"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <label className="block text-sm font-medium">End Time</label>
      <input
        type="time"
        className="w-full border rounded p-2 mb-3"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={handleConfirm}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
