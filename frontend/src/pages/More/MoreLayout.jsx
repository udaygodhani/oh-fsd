import React from 'react'
import { Outlet } from 'react-router-dom'

const MoreLayout = () => {
  return (
    <div className='min-h-screen w-full'>
      <Outlet />
    </div>
  )
}

export default MoreLayout
