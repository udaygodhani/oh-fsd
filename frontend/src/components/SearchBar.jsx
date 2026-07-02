import React from "react";
import { FiSearch, FiSliders } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="w-full py-10 bg-[#0B061B]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-4">

          {/* Search Input */}
          <div className="flex-1 flex items-center bg-[#17112D] border border-purple-500/20 rounded-2xl px-5 h-16 shadow-lg shadow-purple-900/10">

            <FiSearch className="text-gray-400 text-2xl" />

            <input
              type="text"
              placeholder="Search discussions..."
              className="flex-1 ml-4 bg-transparent outline-none text-white placeholder:text-gray-500 text-lg"
            />
          </div>

          {/* Filter Button */}
          <button className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center hover:scale-105 transition duration-300 shadow-lg shadow-purple-600/40">

            <FiSliders className="text-white text-2xl" />

          </button>

        </div>
      </div>
    </div>
  );
};

export default SearchBar;