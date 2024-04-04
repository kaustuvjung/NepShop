import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth/authSlice";
import emailReducer from "./email/emailSlice";
import filterReducer from './auth/filterSlice';

export const store = configureStore({
    reducer : {
        auth: authReducer, 
        email: emailReducer,  
        filter: filterReducer       
    },
});
