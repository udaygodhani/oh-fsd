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

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            <img src="/phone.jpg" alt="" class='flex'/>
            <img src="/phone2.jpg" alt="" class='flex bottom' />








          </div>

          {/* Right Side */}
          <Sidebar />

        </div>

      </div>

   
      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;