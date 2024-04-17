import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import './ProductDetails.css';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../redux/action/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import BreadCrum from "../breadCrums/BreadCrum";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from "../../redux/action/cartAction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";


const ProductDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const {product, loading, error } =useSelector(state => state.productDetails);
    console.log("product ,", product);
    const { success, error: reviewError } = useSelector((state) => state.newReview);


    const options = {
      size:"large",
      value : product.ratings,
      readOnly:true,
      precision: 0.5,
    };



  

    const [quantity, setQuantity] = useState(1);
    const [open , setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    

    const increaseQuantity =() =>{
      if(product.Stock <= quantity) return;

      const qty = quantity + 1;
      setQuantity(qty);
    }

    const decreaseQuantity =() =>{
      if(1 >= quantity) return;

      const qty = quantity - 1;
      setQuantity(qty);
    }

    const addToCart = () =>{
      dispatch(addItemsToCart(id, quantity));
      toast.success("Items added to cart sucessfully");
    };

    const submitReviewToggle =() => {
      open ? setOpen(false) : setOpen(true);
    };

  const submitReview = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);

  };
  

    useEffect(() =>{
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
      if(reviewError){
        toast.error(error);
        dispatch(clearErrors());
      }
      if(success){
        toast.success("Review Submitted");
        dispatch({ type: NEW_REVIEW_RESET});
      }
        dispatch(getProductDetails(id));
    },[dispatch, id, error,reviewError, reviewError, success ]);



    return (
      <Fragment>
        {loading ? <Loader/> : (
          <Fragment>
            <MetaData title = {`${product.name}--Nepshop`} /> 
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
            <Rating{...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`$${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity} >-</button>
                <input readOnly type="number" value = {quantity}/>
                <button onClick={increaseQuantity} >+</button>
              </div>
              <button
                disabled={product.Stock < 1 ? true : false}
                onClick={ addToCart}  
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

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
           
         </div>   

         <h3 className="reviewsHeading"> Reviews</h3> 

         <Dialog
         aria-labelledby = "simple-dialog-title"
         open={open}
         onClose={submitReviewToggle}
         >
          <DialogContent>Submit Review</DialogContent>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value) } 
              value={rating}
              size="large"
            />
            <textarea className="submitDialogTextArea" cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            > </textarea>

          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={submitReview} color="primary">
              Submit
            </Button>
          </DialogActions>
          
         </Dialog>



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
