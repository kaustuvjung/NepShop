import React, { Fragment, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./Product.css"
import { clearErrors, getProduct } from '../../redux/action/productAction';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../home/ProductCard';
import { useEffect } from 'react';
import Loader from '../layout/loader/Loader';
import Pagination from "react-js-pagination"
import { toast } from 'react-toastify';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData';


const categories = [
  "mens",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "womens",
  "kids",
];


const Product = () => {

  const  dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {products, 
      loading, 
      error, 
      productsCount , 
      resultPerPage,
      filteredProductsCount
    } = useSelector(state => state.products);

    const {keyword} = useParams();


      const setCurrentPageNo = (e) =>{
        setCurrentPage(e);
      }
      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
      let count =filteredProductsCount;

      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
        
      }, [dispatch, keyword, currentPage, price, category, ratings, error ])

      
  return (
    <Fragment>
      {loading? <Loader/> : 
      <Fragment>
        <MetaData title = "Product--NepShop" /> 
        <h2 className="productsHeading">Products</h2>

        <div className="products">
          {products && 
          products.map((product) =>(
            <ProductCard key={product._id}  product={product} />
          ))}
        </div>
        <div className="filterBox">
                  <Typography>Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                  />

                  <Typography>Categories</Typography>
                  <ul className="categoryBox">
                    {categories.map((category) => (
                      <li
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                  <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => {
                        setRatings(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                    />
                  </fieldset>
                </div>
        <div className="paginationBox">
         {resultPerPage < count  && (
           <Pagination
               activePage={currentPage}
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