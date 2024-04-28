import React from 'react'
import AdminHeaderComponent from '../../molecules/AdminHeaderComponent'
import SmallChartsCombined from '../SmallChartsCombined'

const AdminLanding = () => {
  return (
    <div className='adminLanding'>
      <div className='heading'>
        <AdminHeaderComponent />
      </div>
      <SmallChartsCombined />
    </div>
  )
}

export default AdminLanding
