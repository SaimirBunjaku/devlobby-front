import React from 'react'
import UserTable from '../../molecules/UserTable'
import BigChartAndStats from '../BigChartAndStats'
import './UserAdmin.scss'

const UsersAdmin = () => {
  return (
    <div className='userAdmin'>
      <div className='chartAndStats'>
        <BigChartAndStats />
      </div>
      <div className='table'>
        <UserTable />
      </div>
    </div>
  )
}

export default UsersAdmin
