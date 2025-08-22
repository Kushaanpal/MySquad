import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; // hamburger icon

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-white font-bold text-xl">MySquad</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
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

        {/* Auth Buttons OR Hamburger Menu */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              {/* Hamburger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <Menu className="text-white w-6 h-6" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-matches"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Matches
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Notifications
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
