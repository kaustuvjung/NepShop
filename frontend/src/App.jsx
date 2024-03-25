import {BrowserRouter, Route, Routes} from "react-router-dom";

import './index.css'
import Header from "./components/header/Header";
import Fotter from './components/footer/Fotter';
import Home from "./home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";


const App = () => {
  // apply every Http request we made
  axios.defaults.withCredentials = true;
  // when page is refreshed it getLoginStatus from backend to clinet side.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);


  return (
    <>

    <BrowserRouter>
    <ToastContainer />
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}  />
      <Route path="/shop" element={<Shop /> } />
      <Route path="/mens" element={<ShopCategory category ="men" /> } />
      <Route path="/womens" element={<ShopCategory category ="women" /> } />
      <Route path="/kids" element={<ShopCategory category ="kid" /> } />
      <Route path="/product" element={<Product/> } >
        <Route path=":productId" element={<Product/>}/>
      </Route>
      <Route path="/cart" element={<Cart/> } />
      <Route path="/login" element={<Login/>}  />
      <Route path="/register" element={<Register/>}  />
      <Route path="/profile" element={<Profile />}  />
      
    </Routes> 
    <Fotter /> 
    </BrowserRouter>


    </>
  );
};

export default App;
