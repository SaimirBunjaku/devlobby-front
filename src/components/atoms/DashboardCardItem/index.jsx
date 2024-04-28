import React from 'react'

const DashboardCardItem = ({ content, size, isLast }) => {
  return (
    <div className={`${isLast ? '' : 'border-bottom'}`}>
      <div className='item-container'>
        <div className='description'>{content}</div>
        <div className='size'>{size}</div>
      </div>
    </div>
  )
}

export default DashboardCardItem
