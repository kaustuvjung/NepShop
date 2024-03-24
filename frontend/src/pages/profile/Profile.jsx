import React, { useEffect, useState } from 'react'
import './Profile.css'
import PageMenu from '../../components/pageMenu/PageMenu'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { getUser, updateUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';


const Profile =() => {
    const { isLoading, user } = useSelector(
        (state) => state.auth
    );
    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        address: user?.address || {},
    };
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagepreview, setImagePreview] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(user === null){
            dispatch(getUser());
        }
       
    }, [dispatch]);

    useEffect(() => {
        if(user){
            setProfile({
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                role: user?.role || "",
                address: user?.address || {},
            })
        }          
       
    }, [dispatch, user]);



    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setProfile({ ...profile, [name] : value });
       };

    const handleImageChange = (e) => {
      setProfileImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const saveProfile = async (e) => {
        e.preventDefault()
        const userdata ={
            name: profile.name,
            phone: profile.phone,
            address:{
            address: profile.address,
            state: profile.state,
            country: profile.country,
            postalcode: profile.postalcode,          
            } 
        }
      await dispatch(updateUser(userdata));
        console.log(userdata);
    };


    
  return (
    <>
    <section> 
    {isLoading && <Loader/>}
    <div className="container">
        <PageMenu />
    </div>
        <h2>Profile</h2>

        <div className="--flex-start profile">
            <Card cardClass={"card"}>
                {!isLoading  &&(
                  
                  <>
                  <div className="profile-photo">
                    
                        <div>
                <img src={imagepreview === null ? user?.phone : imagepreview} alt="profile" />
                <h3>Role: {profile.role}</h3>
              </div>
                        
                    </div>
                    <div>
                        
                    </div>
                    <form onSubmit={saveProfile}>
                        <div>
                        <p>
                            <label>Change Photo</label>
                            <input 
                              type='file'
                              accept="image/*"
                              name="image"
                              onChange={handleImageChange}
                            />
                            
                        </p>

                        </div>
                      
                        <p>
                            <label>Name</label>
                            <input 
                              type='text'
                              name="name"
                              value = {profile?.name}
                              onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label>Email</label>
                            <input 
                              type='email'
                              name="email"
                              value = {profile?.email}
                              onChange={handleInputChange}
                              disabled
                            />
                        </p>
                        <p>
                            <label>Phone</label>
                            <input 
                              type='text'
                              name="phone"
                              value = {profile?.phone}
                              onChange={handleInputChange}
                              required
                            />
                        </p>
                        <p>
                            <label>Address</label>
                            <input 
                              type='text'
                              name="address"
                              value = {profile?.address?.address}
                              onChange={handleInputChange}
                              required

                    
                            />
                        </p>
                        <p>
                            <label>State</label>
                            <input 
                              type='text'
                              name="state"
                              value = {profile?.address?.state}
                              onChange={handleInputChange}
                              required
                            />
                        </p>
                        <p>
                            <label>Country:</label>
                            <input 
                              type='text'
                              name="country"
                              value = {profile?.address?.country}
                              onChange={handleInputChange}
                              required
                            />
                        </p>
                        <p>
                            <label>Postal Code:</label>
                            <input 
                              type='text'
                              name="postalcode"
                              value = {profile?.address?.postalcode}
                              onChange={handleInputChange}
                              required
                            />
                        </p>
                        <button  className="rounded-md bg-indigo-600 p-96 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"  >
                            Submit
                        </button>

                    </form>
                    </>
                )}
            </Card>
        </div>
        </section>
    </>
  )
}

export default Profile