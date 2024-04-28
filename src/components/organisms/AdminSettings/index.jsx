import React from 'react'
import DasboardCardAndTaskManager from '../DashboardCardAndTaskManager'
import './AdminSettings.scss'

const AdminSettings = () => {
  return (
    <div className='adminSettings'>
      <h1>AdminSettings</h1>
      <div>
        <DasboardCardAndTaskManager />
      </div>
    </div>
  )
}

export default AdminSettings
