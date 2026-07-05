import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar';

const MarketLayout = () => {
  return (
    <div className='min-h-screen w-full flex justify-center items-center flex-col'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MarketLayout
