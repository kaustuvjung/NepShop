import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Fotter = () => {
  return (

<footer class="bg-blue-100/80 font-sans dark:bg-gray-900">
    <div class="container px-6 py-3 mx-auto">
        

        <div class="sm:col-span-3 flex gap-20">
        {/* <div class="gap-4">
                <p class="font-semibold text-gray-600 dark:text-white">Quick Link</p>
                <div class="flex flex-col items-start mt-7 space-y-4">
                    <p class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Home</p>
                   
                </div>
            </div>             */}
            </div>
          
        <p class="font-sans p-8 text-start md:text-center md:text-lg md:p-4 text-white">© 2024 NepShop Inc. All rights reserved.</p>
    </div>
</footer>
    




  )
}

export default Fotter