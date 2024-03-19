import React from 'react'
import "./FotterLink.scss"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram ,FaTwitter } from "react-icons/fa";
// import LogoImg from "../../assets/NEPSHOP.png"
import LogoImg from "../../assets/download.png"

const FotterLink = () => {
  return (
     <>

     <section className="footer-section">
      <div className="container footer">
        <div className="footer-logo">
          <img src={LogoImg} alt="logo" />
        </div>

        <div className="footer-menu">
          <p className="link-heading">
            Features 
          </p>
          <ul className="nav-ul footer-links">
            <li>
              <a href="#home">Link Shortenning</a>
            </li>
            <li>
              <a href="#home">Branded Links</a>
            </li>
            <li>
              <a href="#home"> Analytics</a>
            </li>
          </ul>
        </div>

        <div className="footer-menu">
          <p className="link-heading">
            Resources
          </p>
          <ul className="nav-ul footer-links">
            <li>
              <a href="#home">Link Shortenning</a>
            </li>
            <li>
              <a href="#home">Branded Links</a>
            </li>
            <li>
              <a href="#home"> Analytics</a>
            </li>
          </ul>
        </div>

        <div className="footer-menu">
          <p className="link-heading">
            Company
          </p>
          <ul className="nav-ul footer-links">
            <li>
              <a href="#home">Link Shortenning</a>
            </li>
            <li>
              <a href="#home">Branded Links</a>
            </li>
            <li>
              <a href="#home"> Analytics</a>
            </li>
          </ul>
        </div>

      </div>
     </section>

     </>
  )
}

export default FotterLink