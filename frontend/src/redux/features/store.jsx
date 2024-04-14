import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from "@redux-devtools/extension";
import authReducer from "./auth/authSlice";
import emailReducer from "./email/emailSlice";
import filterReducer from './auth/filterSlice';
import { productDetailsReducer, productReducer } from './product/productReducers';

const reducer ={
    auth: authReducer, 
    email: emailReducer,  
    filter: filterReducer,
    products: productReducer,
    productDetails: productDetailsReducer,
}



const store = configureStore({
    reducer,
   
    devTools: composeWithDevTools(),
});

export default store;
