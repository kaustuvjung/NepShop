import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import authService from '../redux/features/auth/authService';

const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    useEffect(() => {

        //check whether user is login or not
        let isLoggedIn;
        const redirectLoggedOutUser =  async() =>{
            try {
                isLoggedIn = await authService.getLoginStatus();

            } catch (error) {
                console.log(error.message);
            }

            if (!isLoggedIn){
                toast.info("User session is Expired, Please Login to continue");
                navigate(path);
                return;
            }
        };
        redirectLoggedOutUser();

    }, [path, navigate]);
 
}

export default useRedirectLoggedOutUser;