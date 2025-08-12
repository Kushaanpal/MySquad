import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-y-auto font-poppins">
      {/* Background Video */}
      <video
        src="/backround-video.mp4" // make sure spelling is correct
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setLoaded(true)}
        className={`fixed top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/60"></div>

      {/* Page Content */}
      <div className="relative z-10 text-white">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-10 md:px-20">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Discover Your <span className="text-green-400">Game</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">
            Book venues, connect with players, and join matches instantly.
            Whether you’re a beginner or a pro, there’s a game waiting for you.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/book"
              className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
            >
              Book a Venue
            </Link>
            <Link
              to="/list"
              className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
            >
              Get Listed
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-10 md:px-20 bg-black/50 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Why Choose MySquad?</h2>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            MySquad makes it easier than ever to find people who share your love
            for sports. From cricket to football, badminton to basketball, our
            platform connects you to the right players and venues at the right
            time.
          </p>
        </section>

        {/* Features Section */}
        <section className="py-20 px-10 md:px-20 bg-black/70 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-8">What You Can Do</h2>
          <ul className="grid gap-8 md:grid-cols-3">
            <li className="p-6 bg-white/10 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Book Venues</h3>
              <p className="text-gray-300">
                Find sports venues nearby and book instantly.
              </p>
            </li>
            <li className="p-6 bg-white/10 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Join Matches</h3>
              <p className="text-gray-300">
                Browse upcoming matches and join with one click.
              </p>
            </li>
            <li className="p-6 bg-white/10 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Meet Players</h3>
              <p className="text-gray-300">
                Connect with athletes who share your passion.
              </p>
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-10 md:px-20 bg-green-500 text-black text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Play?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Sign up now and take your game to the next level with MySquad.
          </p>
          <Link
            to="/register"
            className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
        </section>
      </div>
    </div>
  );
}
