import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-[#0B061B] py-16">
      {/* Background Glow */}
      <div className="absolute -top-20 left-20 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-20 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Start crypto trading.
          </h1>

          <h2 className="mt-3 text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Join and learn today.
          </h2>

          <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl font-medium">
            trade in real experience,
            learn about beyond currency,
            and grow your knowledge in crypto trading.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-10 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold flex items-center gap-3 hover:scale-105 duration-300 shadow-lg shadow-purple-500/40 cursor-pointer"
          >
            Get Started
            <FiArrowRight />
          </button>
        </div>

        {/* Right Side Card */}
        <div className="flex justify-center">
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-xl opacity-80 group-hover:opacity-100 transition duration-500"></div>

            {/* Main Card */}
            <div className="relative w-[480px] h-[220px] rounded-[40px] bg-[#151026] border border-purple-500/20 flex items-center justify-center overflow-hidden">
              {/* Floating Glow */}
              <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]"></div>

              {/* Decorative Circle */}
              <div className="absolute top-6 right-6 w-20 h-20 border border-cyan-400/30 rounded-full flex items-center justify-center">
                <img height={55} width={55} src="/project-logo.png" alt="Logo" />
              </div>

              <div className="text-center z-10">
                <div className="flex justify-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <div className="w-3 h-3 rounded-full bg-pink-500 animate-ping"></div>
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                </div>

                <h1 className="text-5xl font-bold text-white">
                  Crypto Groww
                </h1>

                <p className="text-gray-400 mt-4">
                  Crypto Trading • Learn • Grow
                </p>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;