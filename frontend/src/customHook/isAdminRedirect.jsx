import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../redux/features/auth/authService";
import { useSelector } from "react-redux";

const isAdminRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check whether user is logged in or not
    let isLoggedIn;
    let user;
    
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus();
      } catch (error) {
        console.log(error.message);
      }
      
      if (!isLoggedIn) {
        toast.info("User session is Expired, Please Login to continue");
        navigate("/login");
        return;
      }
      
      try {
        user = await authService.getUser();
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
      
      // Check if user is defined before accessing its role
      if (user && user.role !== "admin") {
        toast.info("Unauthorized user");
        navigate("/");
        return;
      }
    };
    
    redirectLoggedOutUser();
  }, [navigate]);
};

export default isAdminRedirect;
