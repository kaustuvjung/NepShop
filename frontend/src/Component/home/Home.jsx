import React from 'react'
import Slider from '../layout/slider/Slider'
import "./Home.scss"
import { productData } from '../carousel/data'
import ProductCarousel from '../carousel/Carousel'
import CarouselItem from '../carousel/CarouselItem'
import ProductCategory from './ProductCategory'


const PageHeading = ({heading, btnText} ) => {
  return (
    <>
    <div className="flex justify-between items-center">
      <h2 className="font bold mt-4">{heading}</h2>
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
    <>
    {/* <div  className='container mx-auto mt-1'> */}
    <div  className='container mx-auto mt-1'>
     <Slider />
     <section>
      <div  className='container mt-4 '>
        <PageHeading heading={"Latest Product"} 
        btnText={"Shop NOW"}/>
        <ProductCarousel  products={productss}/>
      </div>
     </section>
     

     <section className="--bg-light">
      <div className="">
        <h3>Category</h3>

        <ProductCategory />
      </div>
     </section>
     
     
    </div>
   
    </>
  )
}

export default Home