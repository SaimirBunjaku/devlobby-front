import React from 'react'
import './AdminHeaderComponent.scss'
import graphImage from '../../../assets/images/graph_image.png'

function AdminHeaderComponent () {
  return (
    <div className='adminHeaderComponent'>
      <div className='dashboard-header-container'>
        <header className='dashboard-header'>
          <div className='left-content'>
            <h3>Welcome to your Dashboard!</h3>
            <p>
              Welcome to your Admin Dashboard! Check out your stats, handle user
              info, and set things up just how you like. Get updates in
              real-time and manage your data smoothly. Your dashboard, your way!
            </p>
          </div>
          <div className='right-content'>
            <img src={graphImage} alt='Graph' />
          </div>
        </header>
      </div>
    </div>
  )
}

export default AdminHeaderComponent
