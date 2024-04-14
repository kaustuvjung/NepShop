import React, { Fragment, useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useNavigate, useParams } from 'react-router-dom';
import "./Product.css"
import BreadCrum from '../breadCrums/BreadCrum';
import ProductDisplay from './producDisplay/ProductDisplay';
import RelatedProduct from './relatedProduct/RelatedProduct';
import { clearErrors, getProduct } from '../../redux/action/productAction';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../home/ProductCard';
import { useEffect } from 'react';
import Loader from '../layout/loader/Loader';
import Pagination from "react-js-pagination"
import { toast } from 'react-toastify';

const Product = () => {
  // const {all_product} = useContext(ShopContext);

  // const product = all_product.find((e) => e.id === Number(productId));

  const  dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const {products, 
      loading, 
      error, 
      productsCount , 
      resultPerPage
    } = useSelector(state => state.products);

    const {keyword} = useParams();



//   <RelatedProduct />


  const setCurrentPageNo = (e) =>{
    setCurrentPage(e);
  }
useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }
  dispatch(getProduct(keyword, currentPage))
  
}, [dispatch, keyword, currentPage])
  return (
    <Fragment>
      {loading? <Loader/> : 

      <Fragment>
        <h2 className="productsHeading">Products</h2>

        <div className="products">
          {products && 
          products.map((product) =>(
            <ProductCard key={product._id}  product={product} />
          ))}
        </div>

        <div className="paginationBox">
         {resultPerPage < productsCount && (
           <Pagination
           onPageActive={currentPage}
           itemCountPerPage ={resultPerPage}
           totalItemsCount={productsCount}
           onChange={setCurrentPageNo}
               nextPageText="Next"
               prevPageText="Prev"
               firstPageText="1st"
               lastPageText="Last"
               itemClass="page-item"
               linkClass="page-link"
               activeClass="pageItemActive"
               activeLinkClass="pageLinkActive"           
           />
         )}
        </div>
    
      </Fragment>
    }</Fragment>
    )
}

export default Product