import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const MoreLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0618] text-white">
      <Navbar />
      <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MoreLayout;