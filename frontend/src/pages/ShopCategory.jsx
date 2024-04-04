import React, { useContext } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../context/ShopContext'
import dropdown_icon from '../assets/dropdown_icon.png'
import Item from '../components/Items/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  if (!all_product) {
    return null; // or return a loading indicator or placeholder
  }
  return (
    <div className="shop-category">
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort By <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i)=>{
          if(props.category === item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          } 
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-lodmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory