import React from 'react'
import "./Hero.css"
import hand_icon from "../../../assets/hand_icon.png"
import arrow_icon from "../../../assets/arrow.png"
import hero_imge from "../../../assets/hero_image.png"


const Hero = () => {
  return (
    <div className='flex h-screen  bg-gradient-to-b from-purple-50 via-green-100 to-green-100"'>
        <div className="hero-left">
            <h2>New Arivals Only</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Collections</p>
                <p>for every one</p>
            </div>
            <div>Latest Collections</div>
           
            <div className="hero-latest-btn">
                <div>Latest Collections</div>
                <img src={arrow_icon} alt="" />
            </div>

        </div>
        <div className="hero-right">
            <img src={hero_imge} alt="" />
        </div>
       
    </div>
  )
}

export default Hero