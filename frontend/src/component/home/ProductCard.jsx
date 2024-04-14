import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import  fallbackImage from '../../assets/product_36.png'



const ProductCard = ({ product }) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0,1)",
    activeColor: "tomato",
    size:window.innerWidth <600 ? 20:25,
    isHalf: true,
  };


  return (
    <Link  className="productCard" to={`/product/${product._id}`}>
   <img 
   src={product.image?.filepath} 
   alt={product.name}
    />

    <p>{product.name}</p>
    <div>
    <ReactStars
     value={product.ratings}
    {...options}
  /> <span>({product.numOfReviews})</span>
    </div>
    <span>${product.price}</span>
   </Link>
  )
}

export default ProductCard

