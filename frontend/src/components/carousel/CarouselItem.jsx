import React from 'react'
import "./Carousel.scss"
import { Link } from 'react-router-dom'
import { shortenText } from '../../utils/Index'

const CarouselItem = ({url , name, price,
  description}) => {
  return (
    <div className="shadow-md w-96 h-96 mx-auto mr-5 text-center overflow-hidden">
        <Link to="/product-details">
            <img className="w-full h-3/5 object-cover cursor-pointer" src=
            {url} alt="product" />
            <p className="price">
                {`$${price}`}
            </p>
            <h4>{shortenText(name, 18) }</h4>
            <p className="--mb">{shortenText
            (description, 25)} </p>
        </Link>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add To Cart
        </button>
        
    </div>
  )
}

export default CarouselItem