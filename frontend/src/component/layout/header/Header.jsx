import { Fragment, useContext, useState } from 'react'
import { NavLink , Link, useNavigate  } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {  Bars3Icon,  XMarkIcon,} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { RESET_AUTH, logout } from '../../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../../protect/hiddenLink';
import { UserName } from '../../../pages/profile/Profile';
import cart_icon from '../../../assets/cart_icon.png';
import { ShopContext } from '../../../context/ShopContext';


const Logo = (
  <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Compay</span>
           <Link to="/"> NEPSHOP</Link>
          </a>
        </div>
)

const activeLink = ({ isActive }) => (
  isActive ? "relative text-danger" : ""
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {getTotalCartItems} = useContext(ShopContext);

  const logoutUser = async () =>{
    await dispatch(RESET_AUTH());
    await dispatch(logout()); 
    navigate("/login");
  };

  

  return (
    <header className="bg-gray-900 text-white font-sans">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1" > {Logo}</div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
       

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            
              </Popover.Panel>
            </Transition>
          </Popover>
          
          <NavLink to={"/shop"} className={`text-sm font-semibold leading-6 text-white " ${activeLink}`}>
          Shop
          </NavLink>

          <NavLink to={"/mens"} className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
            Men
          </NavLink>

          <NavLink to={"/womens"} className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
            Women
          </NavLink>
          <NavLink to={"/kids"} className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
           Kids
          </NavLink>
          
        
        </Popover.Group>

        <section className='hidden lg:flex lg:flex-1 lg:justify-between'>
          <ShowOnLogout>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink to={"/login"} className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
            Login
          </NavLink>
          </div>
          </ShowOnLogout>

          <ShowOnLogout>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavLink to={"/register" }className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
            Register
          </NavLink>
        </div>
        </ShowOnLogout>

        </section>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavLink to={"/cart" }className={`text-sm font-semibold leading-6 text-white ${activeLink}`}>
            {/* <img src={cart_icon} alt="" /> */} Cart
            <div>{getTotalCartItems()}</div>
          </NavLink>
        </div>
                         
        <ShowOnLogin>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavLink to={"/order-history" } className={`text-sm font-semibold leading-6 text-white px-4 ${activeLink}`}>
           My Order
          </NavLink>
       
          <Link to= {"/"}  onClick={logoutUser} className= "text-sm font-semibold leading-6 text-white">
          Logout
          </Link>

          <NavLink to={"/profile" } className={`text-sm font-semibold leading-6 text-white px-4 ${activeLink}`}>
          <FaUserCircle size={20}/> 
          <UserName />      
          </NavLink>
          
        </div>  

        </ShowOnLogin>  
        
      </nav>
      
      {/* mobile screen view */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        
          <div className="flex items-center justify-between">
            
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">y</span>
              <img
                className="h-8 w-auto"
                src=""
                alt=""
              />
            </a>
            
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <NavLink
                  to={"/shop"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Shop
                </NavLink>
                <NavLink
                  to={"/mens"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Men
                </NavLink>
                <NavLink
                  to={"/womens"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Women
                </NavLink>
                <NavLink
                  to={"/kids"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Kids
                </NavLink>
                
                
                
                <ShowOnLogout>          
                <NavLink
                  to={"/login"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </NavLink>
                      
                <NavLink
                  to={"/register"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Register
                </NavLink>
                </ShowOnLogout> 

                <NavLink
                  to={"/cart"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Cart
                </NavLink>
                <NavLink
                  to={"/profile"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                   <FaUserCircle size={20}/> 
                   <UserName />
                
                </NavLink>
                 

                <ShowOnLogin>
                <NavLink
                  to={"/order-history"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  My Order
                </NavLink>

                

                <Link
                  to={""} onClick={logoutUser} 
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </Link>
                </ShowOnLogin>
           

              </div>

             
            
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}


