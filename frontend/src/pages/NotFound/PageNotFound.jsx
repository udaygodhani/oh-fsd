import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaArrowLeft,
  FaSearch,
  FaExclamationTriangle,
} from "react-icons/fa";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#0B081E] flex justify-center items-center px-5 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full left-10 top-20"></div>
      <div className="absolute w-96 h-96 bg-pink-500/20 blur-[140px] rounded-full right-10 bottom-20"></div>

      {/* Card */}
      <div className="relative w-full max-w-5xl">


        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex justify-center items-center shadow-[0_0_40px_rgba(34,211,238,.5)]">
            <FaExclamationTriangle className="text-white text-4xl" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-center text-[90px] md:text-[170px] font-black leading-none bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="text-center text-white text-3xl md:text-5xl font-bold mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-center text-gray-400 mt-5 text-lg max-w-2xl mx-auto">
          Sorry! The page you're looking for doesn't exist or may have been
          moved. Try searching or return to the homepage.
        </p>

        

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <Link
            to="/"
            className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold flex items-center gap-3 hover:scale-105 duration-300 shadow-[0_0_40px_rgba(139,92,246,.45)]"
          >
            <FaHome />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-7 py-4 rounded-xl border border-purple-600 text-white flex items-center gap-3 hover:bg-purple-600/20 duration-300"
          >
            <FaArrowLeft />
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
}

export default PageNotFound;