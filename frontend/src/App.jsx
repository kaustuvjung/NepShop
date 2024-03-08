import {BrowserRouter, Route, Routes} from "react-router-dom";

import './index.css';
import Header from "./components/header/Header";
import Login from './components/user/Login';
import Fotter from './components/footer/Fotter';
import Notfound from './components/Error/Notfound';
import Home from "./home/Home";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>


      <Route path="/" element={<Home/>}  />
    </Routes> 
    <Fotter /> 
    </BrowserRouter>


    </>
  );
};

export default App;
