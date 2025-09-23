import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className='w-full min-h-screen'>
        <Navbar/>
        <div className='w-full'>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout