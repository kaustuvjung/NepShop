import React, {  useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import Notification from "../../component/notification/Notification";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getUser, selectUser } from "../../redux/features/auth/authSlice";
import Loader from "../../component/layout/loader/Loader";
import { toast } from "react-toastify";
import { shortenText } from "../../utils/Index";
import MetaData from "../../component/layout/MetaData";



const Profile = () => {

  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(user === null){
        dispatch(getUser());
    }
   
  }, [dispatch]);


  return (
    <>
      {isLoading && <Loader/>}
     {!user?.isVerified && <Notification/>}
     <MetaData title={`${user?.name}'s Profile`} /> 
    
        {!isLoading && user && (
          <>
           <div  className="profileContainer"> 

            <div >
              <h1>My Profile</h1>
              <img
                  src={user?.photo }
                  alt="Profileimg"
                />
              <h3>Role: {user?.role}</h3>
              <Link to="/updateUser">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Phone</h4>
                <p>{user?.phone}</p>
              </div>
              <div>
                <h4>Address</h4>
                <p>{user?.address?.address }</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/changePassword">Change Password</Link>
              </div>

            </div>
            </div>

          </>
        )}
          
        
    
    </>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";

  return shortenText(username, 12)
};


export default Profile;