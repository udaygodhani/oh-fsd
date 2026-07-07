import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#0B061B] min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side - Hero Images */}
          <div className="lg:col-span-2 space-y-6">
            <img src="/phone.jpg" alt="App Preview" className="w-full rounded-3xl" />
            <img src="/phone2.jpg.png" alt="App Preview 2" className="w-full rounded-3xl" />
          </div>

          {/* Right Side - Sidebar with Leaderboard */}
          <Sidebar />

        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;