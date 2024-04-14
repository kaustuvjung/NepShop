import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData'
import "./Search.css"
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if(keyword.trim()){
        const searchUrl = `/products/${keyword}`;
        navigate(searchUrl);           
      } else {
          navigate("/products")
          console.log("notse");
      }
  };
    
  return (
    <Fragment>
        <MetaData title="Search A Product -- NepShop" />
        <form  className="searchBox" onSubmit={searchSubmitHandler}>
            <input 
              type="text"
              placeholder="Search a Product"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />           
        </form>
    </Fragment>
  )
}

export default Search
