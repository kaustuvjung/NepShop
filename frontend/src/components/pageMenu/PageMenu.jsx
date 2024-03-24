import React from 'react'
import "./PageMenu.css"
import { NavLink } from 'react-router-dom'

const PageMenu = () => {
  return (
    <div className='pageMenu bg-primary p mb'>
        <nav className="flex justify-center">
            <ul className="home-links flex items-center list-none">
                <li className="mr-4">
                    <NavLink to="/profile " className="text-white"> profile</NavLink>
                </li> 

                <li>
                    <NavLink to="/wishlist"  className="text-white">WishList</NavLink>
                </li>
            </ul>

        </nav>
    </div>
  )
}

export default PageMenu