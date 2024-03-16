import {BrowserRouter, Route, Routes} from "react-router-dom";

import './index.css'
import Header from "./components/header/Header";
import Fotter from './components/footer/Fotter';
import Home from "./home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
  return (
    <>
    <BrowserRouter>
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
