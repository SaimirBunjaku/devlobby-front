import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../molecules/Navbar'
import Footer from '../../molecules/Footer'
import './LayoutClient.scss'

const ClientLayout = () => {
  return (
    <div className='layoutClient'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default ClientLayout

