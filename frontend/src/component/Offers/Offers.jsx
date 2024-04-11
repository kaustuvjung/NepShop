import React from 'react'
import './Offers.css'
import exclusivee_img from '../../assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className="offers bg-gradient-to-b from-purple-50 via-green-100 to-green-100">
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>Best Sell Products only</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusivee_img} alt="" />
        </div>

    </div>
  )
}

export default Offers