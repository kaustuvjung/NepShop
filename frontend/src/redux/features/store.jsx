import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth/authSlice";
import emailReducer from "./email/emailSlice";
import filterReducer from './auth/filterSlice';
import { newReviewReducer, productDetailsReducer, productReducer } from './product/productReducers';
import { cartReducers } from './cart/cartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './order/orderReducer';

const reducer ={
    auth: authReducer, 
    email: emailReducer,  
    filter: filterReducer,
    products: productReducer,    
    productDetails: productDetailsReducer,
    cart: cartReducers,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
}

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    
    },
};



const store = configureStore({
    reducer,
    preloadedState:initialState,
    
});

export default store;
