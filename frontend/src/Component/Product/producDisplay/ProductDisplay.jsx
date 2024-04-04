import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../../../assets/star_icon.png'
import star_dull_icon from '../../../assets/star_dull_icon.png'
import { ShopContext } from '../../../context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className="productDisplay">
        <div className="productDisplay-left">
            <div className="productDisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productDisplay-img">
                <img className='productDisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productDisplay-right">
            <h1>{product.name}</h1>
            <div className="productDisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p> {122} </p>
            </div> 

            <div className="productDisplay-right-prices">
                <div className="productDisplay-right-price-old">
                    ${product.old_price}
                </div>
                <div className="productDisplay-right-price-new">
                    ${product.new_price}
                </div>
            </div>
                <div className="productDisplay-right-description">
                    A light weighted usually knitted ullover shirt, close fitting and with a round
                    necknile and short sllleves worn as an undershirt or iuter garnments.
                </div>
                <div className="productDisplay-right-size">
                   <h1>Select Size</h1>
                   <div className="productDisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>2XL</div>                         
                </div>
                </div>  
                <button onClick={() =>{addToCart(product.id)}}>Add to Cart</button> 
                <p className='productDisplay-right-category'> <span>Category : </span>Women , T-Shirt </p>   
                <p className='productDisplay-right-category'> <span>Tags : </span>Moden, Latest </p>                       
            
        </div>
    </div>
  )
}


export default ProductDisplay