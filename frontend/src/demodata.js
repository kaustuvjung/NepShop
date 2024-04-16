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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import Shop from "./pages/Shop";
import Cart from "./component/Cart/Cart";
import Forgot from "./pages/auth/Forgot";
import ChangePassword from "./pages/auth/changePassword/ChangePassword";
import Reset from "./pages/auth/Reset";
import Verify from "./pages/auth/Verify";
import LoginWithCode from "./pages/auth/LoginWithCode";
import men_banner from '../src/assets/banner_mens.png';
import women_banner from '../src/assets/banner_women.png';
import kid_banner from '../src/assets/banner_kids.png';
import Product from "./component/Product/Product";
import Search from "./component/Product/Search";
import UpdateProfile from "./pages/profile/UpdateProfile";
import ProductDetails from "./component/Product/ProductDetails";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from  "./component/Cart/OrderSuccess";
import CashPayment from "./component/Cart/CashPayment";
// import Payment from "./component/Cart/Payment";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';



const App = () => {
  const dispatch = useDispatch();
  // apply every Http request we made
  axios.defaults.withCredentials = true;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const {data} = await axios.get(BACKEND_URL + "/api/v1/stripeapikey")
    console.log("Received data from backend:", data);
 
    setStripeApiKey(data.stripeApiKey);
  };
  
  useEffect(() =>{
    dispatch(getLoginStatus());
    if(isLoggedIn && user === null){
      dispatch(getUser());
    }
    
    getStripeApiKey();
  }, [dispatch, isLoggedIn, user]);


  
  return (
    <>

    <BrowserRouter>
    <ToastContainer />
    <Header />
    <Routes>

    
      <Route path="/" element={<Home/>}  />
      
      <Route path="/shop" element={<Shop /> } />

       <Route path="/products" element={<Product/> } >
        <Route path=":keyword" element={<Product/>}/>
      </Route>
      <Route path="/product/:id" element={<ProductDetails /> } />
      
      <Route path="/search" element={<Search /> } />


      <Route path="/updateUser" element={<UpdateProfile /> } />

      <Route path="/cart" element={<Cart/> } />

      <Route path="/login" element={<Login/>}  />
      <Route path="/register" element={<Register/>}  />
      <Route path="/profile" element={<Profile />}  />
      <Route path="/forgot" element={<Forgot />}  />
      <Route path="/resetPassword/:resetToken" element={<Reset/>}  />
      <Route path="/loginWithCode/:email" element={<LoginWithCode/>}  />
      <Route path="/verify/:verificationToken" element={<Verify/>}  />
      <Route path="/changePassword" element={<ChangePassword/>}  />

      <Route path="/shipping" element={<Shipping/>}/>
      <Route path="/order/confirm" element={<ConfirmOrder/>}/>
      
      <Route path="/cashPayment" element={<CashPayment/>}/>
      <Route path="/success" element={<OrderSuccess/>}/>


    
      {/* <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)} />}>
  <Route element={<Payment />} />
</Route> */}


    </Routes> 
    <Fotter /> 
    </BrowserRouter>


    </>
  );
};

export default App;
