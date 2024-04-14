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
        
          

         <ShowOnLogin>
         <NavLink
           to={"/order-history"}
           className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
         >
           My Order
         </NavLink>
         <NavLink
           to={"/profile"}
           className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
         >
            <UserName />
         
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