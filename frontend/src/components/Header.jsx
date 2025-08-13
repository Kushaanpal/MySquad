import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png" // Place your logo file in /public
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="text-white font-bold text-xl">MySquad</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          
          <NavLink
            to="/matches/create"
            className={({ isActive }) =>
              `text-white hover:text-green-400 transition ${
                isActive ? "text-green-400 font-semibold" : ""
              }`
            }
          >
            Book Venue
          </NavLink>
          <NavLink
            to="/matches"
            className={({ isActive }) =>
              `text-white hover:text-green-400 transition ${
                isActive ? "text-green-400 font-semibold" : ""
              }`
            }
          >
            Matches
          </NavLink>
          <NavLink
            to="/players"
            className={({ isActive }) =>
              `text-white hover:text-green-400 transition ${
                isActive ? "text-green-400 font-semibold" : ""
              }`
            }
          >
            Players
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
