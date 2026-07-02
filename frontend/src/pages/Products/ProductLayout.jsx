import React from 'react'
import { Outlet } from 'react-router-dom'

const ProductLayout = () => {
  return (
    <div className='min-h-screen w-full'>
      <Outlet />
    </div>
  )
}

export default ProductLayout
