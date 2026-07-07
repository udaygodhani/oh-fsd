import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar'; // Assuming you have this
import { FiBarChart2, FiClock, FiGlobe, FiTrendingUp } from 'react-icons/fi';

const MarketLayout = () => {
  return (
    <div className="min-h-screen bg-[#0B081E] text-white">
      <Navbar />

      <div className="flex">
        {/* Market Sidebar Navigation */}
        <div className="w-64 bg-[#1A1633] border-r border-gray-800 min-h-[calc(100vh-73px)] p-6 hidden lg:block">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <FiBarChart2 /> Markets
            </h2>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/market/spot"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive
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
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive
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
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive
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
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-[#252040] text-gray-300'
                }`
              }
            >
              <FiGlobe /> Web3
            </NavLink>
          </nav>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-xs uppercase text-gray-500 mb-3">Resources</p>
            <div className="text-sm text-gray-400 space-y-2">
              <p className="hover:text-white cursor-pointer">Market Stats</p>
              <p className="hover:text-white cursor-pointer">Trading Fees</p>
              <p className="hover:text-white cursor-pointer">API Docs</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;