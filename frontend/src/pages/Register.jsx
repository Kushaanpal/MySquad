import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import { toast } from 'react-toastify';
import sportsBackground from '../assets/background-image.jpg'; // Replace with your image path

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/users/register', { username, email, password });
      toast.success("Registration successful!");
      navigate('/'); // Redirect to homepage
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-poppins">
      {/* Background Image */}
      <img
        src={sportsBackground}
        alt="Sports Background"
        className="absolute inset-0 w-full h-full object-cover z-0 transform scale-105 transition-transform duration-[3000ms]"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 min-h-screen">
        
        {/* Left Text Section */}
        <div className="text-white max-w-lg mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Join the <span className="text-green-400">Ultimate</span> Sports Community
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Connect, book venues, and play with athletes near you. Your game starts here.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fadeIn">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Create Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-200 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-400 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
