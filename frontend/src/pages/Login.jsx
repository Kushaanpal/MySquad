import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Google login results
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const googleError = params.get("error");

    if (googleError === "id_not_registered") {
      toast.error("❌ Google account not registered. Please sign up first.");
      navigate("/login");
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      toast.success("✅ Google login successful!");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("✅ Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4001/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png"
            alt="Logo"
            className="w-10 h-10"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
          Sign in to your account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Continue with your email or Google
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-4 h-4"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-xs text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md shadow-sm"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          New here?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
