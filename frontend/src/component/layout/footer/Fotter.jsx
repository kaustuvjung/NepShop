import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Fotter.css'
import LogoImg from "../../../assets/download.svg"
import instagram_icon from '../../../assets/instagram_icon.png'
import whatsapp_icon from '../../../assets/whatsapp_icon.png'

const Fotter = () => {
  return (
    <div className="fotter px-6 py-3 mx-auto bg-blue-100 bg-opacity-80 font-sans dark:bg-gray-900">
      <div className="fotter-logo">
        <img src={LogoImg} alt="" />
      </div>  
      <ul className="footer-links">
      <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>

      </ul>
    
        <div className="fotter-social-icon">
          <div className="footer-icons-container">
            <img src={instagram_icon} alt="instagram" />
          </div>
    
          <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
          </div>
        </div>
        <div className="fotter-copyright">
          <hr />
        <p >© 2024 NepShop Inc. All rights reserved.</p>
        </div>
      </div>
  )
}

export default Fotter