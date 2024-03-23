import React from 'react'
import Slider from '../components/slider/Slider'
import "./Home.scss"
import { productData } from '../components/carousel/data'
import ProductCarousel from '../components/carousel/Carousel'
import CarouselItem from '../components/carousel/CarouselItem'
import ProductCategory from './ProductCategory'
import FotterLink from '../components/footer/FotterLink'


const PageHeading = ({heading, btnText} ) => {
  return (
    <>
    <div className="flex justify-between items-center">
      <h3 className="font bold">{heading}</h3>
      <button className=" text-center py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {btnText}
      </button>
    </div>
    <div className="border-t border-gray-300 my-2"></div>
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
     {/* <Slider /> */}
     <section>
      <div className="containers">
        <PageHeading heading={"Latest Product"} 
        btnText={"Shop NOW"}/>
        <ProductCarousel  products={productss}/>
      </div>
     </section>
     

     <section className="--bg-grey">
      <div className="container">
        <h3>Category</h3>

        <ProductCategory />
      </div>
     </section>
     
     <FotterLink />
    </div>
  )
}

export default Home
