import SeeMoreButton from '../../atoms/SeeMoreButton'
import icon from '../../../assets/images/icon.png'
import blackLogo from '../../../assets/images/full-logo-black.png'
import './LandingCard.scss'

function Card ({ background, title, text }) {
  return (
    <div className='landingCard'>
      <div className='card' style={{ backgroundImage: `url(${background})` }}>
        <div className='front'>
          <div id='icon'>
            {background === undefined ? null : <img src={icon} alt='logo' />}
          </div>
          <h3>{title}</h3>
        </div>
        <div className='back'>
          <div id='logo'>
            <img src={blackLogo} alt='logo' />
          </div>
          <div className='card-text'>
            <h3>{title}</h3>
            <p>{text}</p>
            {background === undefined ? null : <SeeMoreButton />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
