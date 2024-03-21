import { Fragment, useState } from 'react'
import { NavLink , Link  } from 'react-router-dom';


import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-black-600 font-sans dark:bg-gray-400">
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
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

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
          
          <NavLink to={"/shop"} className={`text-sm font-semibold leading-6 text-gray-900 ${activeLink}`}>
          Shop
          </NavLink>

          <a href="#" className="teegister#xt-sm font-semibold leading-6 text-gray-900">
            Features
          </a>
          
         
          
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a>
        </Popover.Group>
        <section className='hidden lg:flex lg:flex-1 lg:justify-between'>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink to={"/login"} className={`text-sm font-semibold leading-6 text-gray-900 ${activeLink}`}>
         Login
          </NavLink>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavLink to={"/register" }className={`text-sm font-semibold leading-6 text-gray-900 ${activeLink}`}>
            Register
          </NavLink>
        </div>
        </section>


        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavLink to={"/cart" }className={`text-sm font-semibold leading-6 text-gray-900 ${activeLink}`}>
            Cart
          </NavLink>
        </div>
      
      </nav>
      
      
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        
          <div className="flex items-center justify-between">
            
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">y</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a> */}
              <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Shop
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
            
              
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
              
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
               
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
           

              </div>

             
            
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
