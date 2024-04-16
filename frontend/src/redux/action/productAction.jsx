import axios from "axios";

import { 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS, 
    ALL_PRODUCT_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS 
} from "../../constants/productConstant";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/v1/product/`;

export const getProduct = (keyword ="", currentPage = 1, price = [0, 25000], category , ratings = 0 ) => async(dispatch) =>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});
        ratings
        let link = `${API_URL}products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            link = `${API_URL}products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        console.log("Request URL:", link);

        const { data } = await axios.get(link);
   
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });      
    }
};

// get product details
export const getProductDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});


        const { data } = await axios.get(`${API_URL}product/${id}`);

        console.log(data);


        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
            
        });
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });      
    }
};


// new review details
export const newReview= (reviewData) => async(dispatch) =>{
    try {
        dispatch({type: NEW_REVIEW_REQUEST});

        const config = {
            headers: { "Content-Type": "application/json" },
          };
      
        const { data } = await axios.patch(API_URL + "review" , reviewData, config);

        console.log(data);


        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
            
        });
        
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });      
    }
};






// clearing Errors
export const clearErrors= () => async (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}