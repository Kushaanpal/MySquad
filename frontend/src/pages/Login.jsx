import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Google Login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("✅ Login successful!");
      setIsLoggedIn(true);
      navigate("/");
      window.history.replaceState({}, document.title, "/login");
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4001/auth/google";
  };

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/api/users/login", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("✅ Login successful!");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/api/users/register", {
        username: regUsername,
        email: regEmail,
        password: regPassword,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("✅ Registration successful!");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  if (isLoggedIn || localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex items-center justify-start min-h-screen px-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/sports.jpg" // your background image
          alt="Background"
          className="w-full h-full object-cover opacity-60 blur-sm"
        />
      </div>

      {/* Overlay Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-8 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          {isRegistering ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          {isRegistering ? "Join us by registering below" : "Sign in to continue"}
        </p>

        {/* Login Form */}
        {!isRegistering && (
          <form onSubmit={handleLogin} className="space-y-4 mb-4">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-200 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-200 transition"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-lg shadow hover:bg-teal-600 transition"
            >
              Login
            </motion.button>
          </form>
        )}

        {/* Register Form */}
        {isRegistering && (
          <form onSubmit={handleRegister} className="space-y-4 mb-4">
            <input
              type="text"
              placeholder="Username"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition"
            />
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-lg shadow hover:bg-teal-600 transition"
            >
              Register
            </motion.button>
          </form>
        )}

        {/* Toggle */}
        <div
          className="text-center text-teal-600 font-medium cursor-pointer mb-4 hover:underline"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don’t have an account? Register"}
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-4 h-4"
          />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
