import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import { CgMouse } from "react-icons/cg";
import Popular from '../Product/Popular/Popular'
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../redux/action/productAction';
import { toast } from 'react-toastify';







const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector(state => state.products)
  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct())
    
  }, [dispatch , error]);     



  return (
    <Fragment>
      <MetaData title = "Nep Shop" />     
    <div  className='mx-auto  banner'>
     <p>Welcome to NepShop</p>
     <h1>Explore the NepShop To find new products</h1>
     <a href="#container">
      <button>
        Scroll<CgMouse />
      </button>
     </a>
</div>
     <h2 className="homeHeading">Features Products</h2>
     <div className=" mx-auto container" id= "container">
    {products && products.map(product =>(
       <ProductCard product={product}/>
    ))}
    
     
     

     
 
  

     </div>
     {/* <Popular/> */}
     

     
    
   
    </Fragment>
  )
}

export default Home
