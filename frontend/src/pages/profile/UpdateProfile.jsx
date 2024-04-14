import React, {  useState, useEffect, useLayoutEffect } from "react";
import "./UpdateProfile.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

import Notification from "../../component/notification/Notification";
import Card from '../../component/Card/Card';
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getUser, selectUser, updateUser } from "../../redux/features/auth/authSlice";
import Loader from "../../component/layout/loader/Loader";
import { toast } from "react-toastify";
import MetaData from "../../component/layout/MetaData";




const cloud_name = import.meta.env.VITE_ClOUD_NAME;
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;


const UpdateProfile = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector((state) => state.auth);
    
  
    const initialState = {
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          role: user?.role || "",
          photo: user?.photo || "",
          address: user?.address || {},
          isVerified: user?.isVerified || false,
   
    };
    
    
    const [profile, setProfile] = useState(initialState);
  
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    useEffect(() => {
      if(user === null){
          dispatch(getUser());
      }
     
    }, [dispatch]);
  
    const handleImageChange = (e) => {
      setProfileImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    };
  
    const saveProfile = async(e) =>{
      e.preventDefault();
      let imageURL;
  
      try {
  
        if(profileImage !== null &&(
          profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
         ){
          const image = new FormData();
          image.append("file",profileImage)
          image.append("cloud_name",cloud_name)
          image.append("upload_preset", upload_preset)
  
          // Save Image to Cloudinary
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dxqtrmxbo/image/upload",
            { method: "post", body:image }
          );
          const imgData = await response.json();
          console.log(imgData);
          imageURL = imgData.url.toString();
          
        }
  
        // Save profile to MongoDB
        const userData = {
          name: profile.name,
          phone: profile.phone,
          address:{
            address: profile.address,
            state: profile.state,
            country: profile.country,
            postalcode: profile.postalcode,          
            } ,
          // address: profile?.address || {},
          photo: profileImage ? imageURL : profile.photo,
        };
  
        dispatch(updateUser(userData));
        navigate("/profile")
  
              
      } catch (error) {
        toast.error(error.message);      
      }
  
    };
  
    useLayoutEffect(() =>{
      if(user){
        setProfile({
          ...profile,
          name: user.name,
          email: user.email,
          phone: user.phone,
          photo: user.photo,
          address: user?.address || {},
          role: user.role,
          isVerified: user.isVerified,
        });
      }
    }, [user]);
  
  
    return (
      <>
      <MetaData title={`${user?.name}'s Profile`} />
        <section>
        {isLoading && <Loader/>}
       {!profile.isVerified && <Notification/>}
       
          <div className="container">
         
            <div className="profile">
  
          {!isLoading && user && (
            <>
            <Card cardClass={"card"}> 
              <div className="profile-photo">
                <div>
                  <img
                    src={imagePreview === null ? user?.photo : imagePreview}
                    alt="Profileimg"
                  />
                   <h3>Role: {profile.role}</h3>
                </div>
              </div>
              <form onSubmit={saveProfile}>
              <p>
                  <label>Change Photo:</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                  />
                </p>
  
              </form>
  
              </Card>
  
              <Card cardClass={"card"}>  
              <form onSubmit={saveProfile}>
                
                <p>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={profile?.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </p>
                <p>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                      <label>Address</label>
                      <input
                        type='text'
                        name="address"
                        value={profile?.address?.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>State</label>
                      <input
                        type='text'
                        name="state"
                        value={profile?.address?.state}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Country:</label>
                      <input
                        type='text'
                        name="country"
                        value={profile?.address?.country}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Postal Code:</label>
                      <input
                        type='text'
                        name="postalcode"
                        value={profile?.address?.postalcode}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
  
                <button className="--btn --btn-primary --btn-block">
                  Update Profile
                </button>
              </form>
              </Card>
            </>
          )}
  
         
            </div>
          </div>
        </section>
      </>
    );
  };
export default UpdateProfile
