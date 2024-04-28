import React from 'react'
import DashboardCard from '../../molecules/DashboardCard'
import DashboardTaskManager from "../../molecules/DashboardTaskManager"
import "./demo.scss"

function DasboardCardAndTaskManager() {
  return (
    <div className='card-task-manager'>
    <DashboardCard title={"Generic card"}/>
    <DashboardTaskManager />
    </div>
  )
}

export default DasboardCardAndTaskManager;