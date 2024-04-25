import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth/authSlice";
import emailReducer from "./email/emailSlice";
import filterReducer from './auth/filterSlice';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './product/productReducers';
import { cartReducers } from './cart/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from './order/orderReducer';

const reducer ={
    auth: authReducer, 
    email: emailReducer,  
    filter: filterReducer,
    products: productsReducer,    
    productDetails: productDetailsReducer,
    cart: cartReducers,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct:newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: ordersReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
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
