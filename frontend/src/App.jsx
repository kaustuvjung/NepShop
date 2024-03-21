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
//635

const App = () => {
  // apply every Http request we made
  axios.defaults.withCredentials = true;

  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Header />
    <Routes>


      <Route path="/" element={<Home/>}  />
      <Route path="/login" element={<Login/>}  />
      <Route path="/register" element={<Register/>}  />
      
      
    </Routes> 
    <Fotter /> 
    </BrowserRouter>


    </>
  );
};

export default App;
