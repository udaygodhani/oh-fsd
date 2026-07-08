import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0618] text-white flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductLayout;