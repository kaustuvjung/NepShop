import React from 'react'
import "./PageMenu.css"
import { NavLink } from 'react-router-dom'

const PageMenu = () => {
    return (
      <div className='container ml-20 m-2 py-2'>
        <nav className="pageMenu">
          <ul className="home-links">
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <NavLink to="/wishlist"  className="text-white">WishList</NavLink>                </li>
            <li>
              <NavLink to="/changePassword">Change Password</NavLink>
            </li>
            
          </ul>
        </nav>
      </div>
    );
  };

export default PageMenu