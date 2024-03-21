import React from 'react'
import './Sidebar.css'
import { Link, NavLink } from 'react-router-dom'

import add_products_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Siderbar = () => {
  return (
    <div className='sidebar'>
      
       <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-items">
                <img src={add_products_icon} alt="" />
                <p>Add product</p>
            </div>
        </Link>
     
        
        <Link to={'/listProduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-items">
                <img src={list_product_icon} alt="" />
                <p>Product List</p>
            </div>

        </Link>

    </div>
  )

}

export default Siderbar