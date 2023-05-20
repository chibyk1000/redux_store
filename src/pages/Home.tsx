import React from 'react'
import Hero from '../components/Hero'
import Trusted from '../components/Trusted'
import Benefits from '../components/Benefits'

const Home = () => {
  return (
      <div className='page'>
          

          <Hero />
      <Trusted />
      <Benefits/>
    </div>
  )
}

export default Home