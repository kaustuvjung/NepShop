
import { NavLink , Link, useNavigate  } from 'react-router-dom';

import {  Bars3Icon} from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';


const Logo = (
  <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Compay</span>
            NEP<span>SHOP</span>
          </a>
        </div>
)

const activeLink = ({ isActive }) => (
  isActive ? "relative text-danger" : ""
);

export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () =>{
    await dispatch(logout()); 
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  

  return (
    <header className="bg-black-600 font-sans dark:bg-gray-400">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1" > {Logo}</div>
        
          <NavLink to={"/shop"} className={`text-sm font-semibold leading-6 px-12 text-gray-900 ${activeLink}`}>
          Shop
          </NavLink>
          
          <a href="#" className="text-sm font-semibold leading-6 px-12  text-gray-900">
            Company
          </a>
  

        <section className='hidden lg:flex lg:flex-1 lg:justify-between'>
          <ShowOnLogout>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink to={"/login"} className={`text-sm font-semibold leading-6 text-gray-900 ${activeLink}`}>
            Login
          </NavLink>
          </div>
          </ShowOnLogout>

          <ShowOnLogout>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavLink to={"/register" }className={`text-sm font-semibold leading-6 text-gray-900 ${activeLink}`}>
            Register
          </NavLink>
        </div>
        </ShowOnLogout>

        </section>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavLink to={"/cart" }className={`text-sm font-semibold leading-6 text-gray-900 ${activeLink}`}>
            Cart
          </NavLink>
        </div>
        <ShowOnLogin>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        
           <NavLink to={"/order-history" } className={`text-sm font-semibold leading-6 text-gray-900 px-4 ${activeLink}`}>
           My Order
          </NavLink>
       

          <Link to= {"/"}  onClick={logoutUser} className= "text-sm font-semibold leading-6 text-gray-900 ">
          Logout
          </Link>
        </div>  
        </ShowOnLogin>    
      </nav>
      
   
     
    </header>
  )
}
