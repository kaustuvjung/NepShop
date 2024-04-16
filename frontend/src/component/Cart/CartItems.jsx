import React from 'react'
import './CartItems.css'
import { Link } from 'react-router-dom'




const CartItems = ({item, deleteCartItems}) => {
  
  return (
  
    <div className="CartItemCard">
      <img src={item.image} alt="" className='carticon-product-icon' />
      <div>
        <Link to={`/product/${item.product}`}>{item.name} </Link>
        <span>${item.price}</span>
        <p onClick={() => deleteCartItems(item.product)}> Remove</p>
     
     </div>
     <hr />
{/* 
     <div className="cartitems-down">
<div className="cartitems-total">
    <h1>Cart Total</h1>
    <div>
        <div className="cartitems-total-item">
        <p>SubTotal</p>
            <p>Totalamount</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3 className='font-bold'>Totalamount</h3>
        </div>
    </div>
    <button>Proceed to Checkout</button>
</div>
</div>  */}
     </div>

     
      
  );
}

export default CartItems