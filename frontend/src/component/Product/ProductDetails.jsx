import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import './ProductDetails.css';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../redux/action/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import BreadCrum from "../breadCrums/BreadCrum";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {product, loading, error } =useSelector(state => state.productDetails);


    useEffect(() =>{
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
        dispatch(getProductDetails(id))
    },[dispatch, id, error ])

    const options = {
      edit: false,
      color: "rgba(20,20,20,0,1)",
      activeColor: "tomato",
      size:window.innerWidth <600 ? 20:25,
      value : product.ratings,
      isHalf: true,
    };
  
    

    return (
      <Fragment>
        {loading ? <Loader/> : (
          <Fragment>

       <BreadCrum  product = {product}/>  
          <div className="ProductDetails">
       
            <div>

            <div className="productDisplay-left">
            <div className="productDisplay-img-list">
                <img src={product.image?.filepath}  alt="" />
                <img src={product.image?.filepath}  alt="" />
                <img src={product.image?.filepath} alt="" />
                <img src={product.image?.filepath}  alt="" />
            </div>
            <div className="productDisplay-img">
                <img className='productDisplay-main-img'  src={product.image?.filepath}    
              alt={product.name} />
            </div>
        </div>
             

            {/* <img  
            className="CarouselImage"  
             
             /> */}
       

          {/* <Carousel> */}
       
              {/* {product?.image && product?.image.length > 0 ? (
               product.image.map((image, index) => (
          <div key={index}>
              <img
                  src={image?.filepath}
                  alt={image?.fileName}
              />
           </div>
              )) ) : (
                <p>No image set for this product</p>
              )} */}

              {/* </Carousel> */}
            </div>

            <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`$${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button >-</button>
                <input type="number" value ='1'/>
                <button >+</button>
              </div>
              <button
                disabled={product.Stock < 1 ? true : false}
                
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button className="submitReview">
            Submit Review
          </button>
        </div>
           
         </div>   

         <h3 className="reviewsHeading"> Reviews</h3> 
         {product.reviews && product.reviews[0] ?(
          <div className="reviews">
            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
         ):(
          <p className="noReviews">No Review Yet</p>
         )}

    </Fragment>
          
        ) } 
      </Fragment>
        
      );
    };

export default ProductDetails
