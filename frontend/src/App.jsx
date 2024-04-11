import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'
import Header from "./component/layout/header/Header";
import Fotter from './component/layout/footer/Fotter';
import Home from "./component/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";

import Cart from "./pages/Cart";
import Forgot from "./pages/auth/Forgot";
import ChangePassword from "./pages/auth/changePassword/ChangePassword";
import Reset from "./pages/auth/Reset";
import Verify from "./pages/auth/Verify";
import LoginWithCode from "./pages/auth/LoginWithCode";
import men_banner from '../src/assets/banner_mens.png';
import women_banner from '../src/assets/banner_women.png';
import kid_banner from '../src/assets/banner_kids.png';
import Product from "./pages/Product";

const App = () => {
  const dispatch = useDispatch();
  // apply every Http request we made
  axios.defaults.withCredentials = true;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  
  useEffect(() =>{
    dispatch(getLoginStatus());
    if(isLoggedIn && user === null){
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);


  return (
    <>

    <BrowserRouter>
    <ToastContainer />
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}  />
      <Route path="/shop" element={<Shop /> } />
      <Route path="/mens" element={<ShopCategory banner={men_banner} category ="men" /> } />
      <Route path="/womens" element={<ShopCategory banner={women_banner} category ="women" /> } />
      <Route path="/kids" element={<ShopCategory banner ={kid_banner} category ="kid" /> } />

      <Route path="/product" element={<Product/> } >
        <Route path=":productId" element={<Product/>}/>
      </Route>

      <Route path="/cart" element={<Cart/> } />
      <Route path="/login" element={<Login/>}  />
      <Route path="/register" element={<Register/>}  />
      <Route path="/profile" element={<Profile />}  />
      <Route path="/forgot" element={<Forgot />}  />
      <Route path="/resetPassword/:resetToken" element={<Reset/>}  />
      <Route path="/loginWithCode/:email" element={<LoginWithCode/>}  />
      <Route path="/verify/:verificationToken" element={<Verify/>}  />
      <Route path="/changePassword" element={<ChangePassword/>}  />


      
    </Routes> 
    <Fotter /> 
    </BrowserRouter>


    </>
  );
};

export default App;
