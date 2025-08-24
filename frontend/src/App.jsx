import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateMatch from "./pages/CreateMatch.jsx";
import Matches from "./pages/Matches.jsx";
import Venues from "./pages/Venues.jsx";
import VenueForm from "./pages/VenueForm.jsx";
import VenueBookingPage from "./pages/VenueBookingPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/matches/create" element={<CreateMatch/>} />
      <Route path="/matches" element={<Matches/>} />
       <Route path="/venues" element={<Venues/>}/>
       <Route path="/venues/create" element={<VenueForm />}/>
       <Route path="/venues/:id" element={<VenueBookingPage />} />
       <Route path="/venues/:id/book" element={<BookingPage />} />
    </Routes>
  );
}
