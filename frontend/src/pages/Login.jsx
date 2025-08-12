import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/"); // Redirect to home or dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue p-8 mt-10 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
        Login
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg transition duration-300"
      >
        Login
      </button>
    </form>
  );
}
