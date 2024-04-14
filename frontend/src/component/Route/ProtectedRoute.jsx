import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
  
  return (
   <Fragment>
    {isLoading === false &&(
        <Route 
         {...rest}
         render={(props) =>{
            if(isLoggedIn === false){
                return navigate("/login");
            }

            if(isAdmin === true && user.role !== "admin"){
                return navigate("/login");
            }
            return <Component {...props}  />;
         }}
        />
    )}

   </Fragment>
  )
}

export default ProtectedRoute
