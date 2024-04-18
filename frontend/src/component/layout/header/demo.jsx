import { Fragment, useContext, useState } from 'react'
import { NavLink , Link, useNavigate  } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { RESET_AUTH, logout } from '../../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../../protect/hiddenLink';
import { UserName } from '../../../pages/profile/Profile';
import cart_icon from '../../../assets/cart_icon.png';

import Search from '../../Product/Search';
import UserOptions from './UserOptions';
import AdminHeader from '../AdminHeader';


const Logo = (
  <div className="flex lg:flex-1">
      
            <span className="sr-only">Your Compay</span>
           <Link to="/"> NEPSHOP</Link>
          
        </div>
)

const activeLink = ({ isActive }) => (
  isActive ? "relative text-danger" : ""
);

export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logoutUser = async () =>{
    await dispatch(RESET_AUTH());
    await dispatch(logout()); 
    navigate("/login");
  };

  

  return (
    <header className="bg-gray-900 text-white font-sans">
      <nav className="mx-auto flex items-center justify-between p-6 lg:px md:px  sm:px max-w-7xl" aria-label="Global">
        <div className="flex lg:flex-1 md:flex-1 sm:flex-1" > {Logo}</div>

        <div className="hidden lg:flex lg:gap-x-12 md:flex md:gap-x-10 sm:flex sm:gap-x-8">
          <div  className="relative">
          </div>
          <NavLink to={"/products"} className={`text-sm font-semibold leading-6 text-white " ${activeLink}`}>
          Product
          </NavLink>
          <AdminHeader/>
        
          {/* <Search/> */}
        </div>
        <section className='hidden lg:flex lg:flex-1 lg:justify-between  md:flex md:flex-1 md:justify-between sm:flex sm:flex-1 sm:justify-between'>
          <ShowOnLogout>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end md:flex md:flex-1 md:justify-end sm:flex sm:flex-1 sm:justify-end ">
          <NavLink to={"/login"} className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
            Login
          </NavLink>
          
          </div>
          </ShowOnLogout>
          <ShowOnLogout>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end md:flex md:flex-1 md:justify-end sm:flex sm:flex-1 sm:justify-end ">
           <NavLink to={"/register" }className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
            Register
          </NavLink>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end  md:flex md:flex-1 md:justify-end sm:flex sm:flex-1 sm:justify-end">
          <UserOptions/>
          
        </div>  
        </ShowOnLogout>
        </section>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end md:flex md:flex-1 md:justify-end sm:flex sm:flex-1 sm:justify-end">
          
        </div>          
        <ShowOnLogin>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end  md:flex md:flex-1 md:justify-end sm:flex sm:flex-1 sm:justify-end">
          <UserOptions/>
          <div className='username'> 
          <UserName />  
          </div>
        </div>  
        </ShowOnLogin>    
      </nav>
    </header>
  )
}


