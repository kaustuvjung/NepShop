import React from 'react'
import Slider from '../components/slider/Slider'
import "./Home.scss"
import { productData } from '../components/carousel/data'
import ProductCarousel from '../components/carousel/Carousel'
import CarouselItem from '../components/carousel/CarouselItem'


const PageHeading = ({heading, btnText} ) => {
  return (
    <>
    <div className="--flex-between">
      <h2 className="--fw-thin">{heading}</h2>
      <button className="--btn">
        {btnText}
      </button>
    </div>
    <div className="--hr"></div>
    </>
  )
}

const Home = () => {
  const productss = productData.map((item, index) => {
    return(
      <div key ={item.id}>
        <CarouselItem
        name = {item.name}
        url = {item.imageurl}
        price = {item.price}
        description = {item.description}
        />

      </div>
    )
  })

  return (
    <div>
     <Slider />
     <section>
      <div className="container">
        <PageHeading heading={"Latest Product"} 
        btnText={"Shop NOW"}/>
        <ProductCarousel  products={productss}/>
      </div>
     </section>
    </div>
  )
}

export default Home
