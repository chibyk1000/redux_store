import React from 'react'

const Trusted = () => {

    const images = ['/svgs/Airbnb.svg', '/svgs/AliExpress.svg', '/svgs/Amazon.svg', '/svgs/Google.svg', '/svgs/Paypal.svg']
  return (
      <div className='trusted'>
          
          {
              images.map(image => (
                  <img src={image} alt="" />
              ))
          }
    </div>
  )
}

export default Trusted