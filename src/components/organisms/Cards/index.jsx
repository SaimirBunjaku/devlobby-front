import React from 'react'
import Card from '../../molecules/LandingCard'
import b1 from '../../../assets/images/b1.png'
import b2 from '../../../assets/images/b2.jpg'
import b3 from '../../../assets/images/b3.jpg'
import './Cards.scss'

export default function Cards () {
  return (
    <div className='cards'>
      <div className='container'>
        <Card
          background={b1}
          title='Developer'
          text='We currently provide support for 10 widely used programming languages. Utilize our robust development tools like Playground to experiment, debug, and create your projects directly online.'
        />
        <Card
          background={b2}
          title='Community & Contests'
          text='Join our expansive tech community, boasting hundreds of thousands of engaged users. Take part in our contests to push your limits, and enjoy all the rewards that come with the challenge.'
        />
        <Card
          background={b3}
          title='Start Exploring'
          text='Explore, a thoughtfully structured tool that enhances your DevLobby journey. It provides a well-organized framework, ensuring you take meaningful steps toward advancing your programming career.'
        />
      </div>
    </div>
  )
}
