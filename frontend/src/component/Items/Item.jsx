import React from 'react';
import "./Item.css";
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";



const Item = ({product}) => {


  const options = {
    edit: false,
    color: "rgba(20,20,20,0,1)",
    activeColor: "tomato",
    size:window.innerWidth <600 ? 20:25,
    isHalf: true,
  };


  return (
    <div className="item">
       <Link to={`/product/${product._id}`}>
       <img  src={product.image?.filepath} 
        alt={product.name} /> 
         <p>{product.name}</p>
                <div>
            <ReactStars
            value={product.ratings}
            {...options}
          /> <span>({product.numOfReviews})</span>
            </div>
        <div className="item-prices">
            <div className="item-price-new">
            ${product.price}
            </div>
            <div className="item-price-old">
            ${product.price}
            </div>
        </div>

        </Link>
    </div>
  )
}

export default Item