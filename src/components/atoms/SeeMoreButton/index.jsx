import { Link } from 'react-router-dom'
import './SeeMoreButton.scss'

export default function SeeMoreButton () {
  return (
    <div className='seeMoreButton'>
      <Link to='#' className='btn'>
        <button className='see-btn'>See More</button>
      </Link>
    </div>
  )
}
