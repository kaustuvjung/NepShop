import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../redux/features/auth/authService";

const isAdminRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //check whether user is login or not
    let isLoggedIn;
    
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
        const user = await authService.getUser();
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
      if (user.role == "admin") {
        toast.info("Unauthorized user");
        navigate("/");
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate]);
};

export default isAdminRedirect;
