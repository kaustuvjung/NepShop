import axios from "axios";

import { 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS, 
    ALL_PRODUCT_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS } from "../../constants/productConstant";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/v1/product/`;

export const getProduct = (keyword ="", currentPage = 1) => async(dispatch) =>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});

    

        let link = `${API_URL}products?keyword=${keyword}&page=${currentPage}`;
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


// clearing Errors
export const clearErrors= () => async (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}