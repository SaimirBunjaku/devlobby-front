import React from 'react'
import DashboardCardItem from '../../atoms/DashboardCardItem'
import './DashboardCard.scss'

const items = [
  { content: 'Awaiting customer response', size: 52 },
  { content: 'Waiting on feature request', size: 1231 },
  { content: 'Awaiting developer fix', size: 568 },
  { content: 'Pending', size: 52 }
]

const DashboardCard = ({ title }) => {
  return (
    <div className='dashboardCard'>
      <div className='dashboard-card'>
        <header>
          <div className='title-container'>
            <div className='title'>{title}</div>
            <div className='view-details'>View details</div>
          </div>
          <div className='description'>
            <div>
              <span>Group:</span> Support
            </div>
          </div>
        </header>
        <div className='item'>
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <>
                <DashboardCardItem
                  key={i}
                  content={item.content}
                  size={item.size}
                  isLast={isLast}
                />
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
