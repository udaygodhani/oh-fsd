import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiBarChart2, FiClock, FiGlobe, FiTrendingUp } from 'react-icons/fi';

const MarketLayout = () => {
  return (
    <div className="min-h-screen bg-[#0B081E] text-white">
      <Navbar />

      {/* Removed 'h-screen' here to allow the main content to scroll naturally with the page */}
      <div className="flex mt-15">
        
        {/* Market Sidebar Navigation */}
        {/* Kept 'fixed' but added 'overflow-y-auto' so the sidebar itself can scroll if its content ever gets too tall */}
        <div className="w-64 bg-[#1A1633] border-r fixed border-gray-800 h-full p-6 hidden lg:block overflow-y-auto pb-24">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <FiBarChart2 /> Markets
            </h2>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/market/spot"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-[#252040] text-gray-300'
                }`
              }
            >
              <FiTrendingUp /> Spot
            </NavLink>

            <NavLink
              to="/market/future"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-[#252040] text-gray-300'
                }`
              }
            >
              <FiClock /> Futures
            </NavLink>

            <NavLink
              to="/market/all"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-[#252040] text-gray-300'
                }`
              }
            >
              <FiBarChart2 /> All Markets
            </NavLink>

            <NavLink
              to="/market/web3"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-[#252040] text-gray-300'
                }`
              }
            >
              <FiGlobe /> Web3
            </NavLink>
          </nav>
        </div>

        {/* Main Content Area */}
        {/* Added 'lg:ml-64' to offset the fixed sidebar (which has 'w-64') so content doesn't get hidden behind it */}
        <div className="flex-1 lg:ml-64 p-4 lg:p-8 flex flex-col justify-between min-h-[calc(100vh-60px)]">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;