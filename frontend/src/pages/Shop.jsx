    import React, { Fragment, useEffect } from 'react'
import Popular from '../component/Product/Popular/Popular'
import Offers from '../component/Offers/Offers'
import NewCollection from '../component/Product/NewCollection/NewCollection'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors, getProduct } from '../redux/action/productAction'
import Loader from '../component/layout/loader/Loader'
import Item from '../component/Items/Item'
import ProductCard from '../component/home/ProductCard'

    const Shop = () => {

        const dispatch = useDispatch();
        const {products, 
            loading, 
            error} = useSelector(state=> state.products) ;
        useEffect(() => {
          if (error){
            toast.error(error);
            dispatch(clearErrors());
          }
          dispatch(getProduct())
         
        }, [dispatch, error])
      
    return (
      <Fragment>

    {loading? <Loader/> :
            <Fragment>
            <div className='container mx-auto'>
            <h2>Shop</h2>
         {products &&
            products.map((product) =>(
               <Item key={product._id} product= {product} /> 
            ))}
            </div>
        </Fragment> }
      </Fragment>
       
    )
    };


    export default Shop