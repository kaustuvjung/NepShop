import React, { useEffect, useState } from 'react';
import  styles from "./auth.module.scss";
import loginImg from "../../assets/Login.png";
import Card from '../../components/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/Index';
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
}; 

const Register = () => {
 const [formData, setFormData] = useState(initialState);
 const { name, email, password, cPassword} = formData;
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth)

 const handleInputChange = (e) => {
  const { name, value} = e.target
  setFormData({ ...formData, [name] : value })
 };

const registerUser = async (e) => {
  e.preventDefault();
  console.log(name, email, password, cPassword);
  if (!email || !password){
    return toast.error("All field are required")
  }
  if (!validateEmail(email)){
    return toast.error("please enter a validate email")
  }
  if (password.length < 6){
    return toast.error("Password must be up to 6 characters")
  }
 
  if (password !== cPassword){
    return toast.error("Password do not match")
  }
  const userData ={
    name,
    email,
    password
  }
  await dispatch(register(userData));
};
useEffect(() =>{
  if(isSuccess && isLoggedIn){
    navigate("/")
  }
  dispatch(RESET_AUTH());
},[isSuccess, isLoggedIn, dispatch, navigate])

  return (
    <> 
    {isLoading  && <Loader />}
    <section className={`container ${styles.auth}`}>
          
      <Card>
      <div className="w-96 p-6 animate-slide-up">
  <h2 className="font-bold text-lg">Create your NepShop Account</h2>
  <form onSubmit={registerUser} className="mt-4">
    <input 
      type="text"
      placeholder="Name"
      required
      name="name"
      value={name}
      onChange={handleInputChange}
      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />

    <input 
      type="text"
      placeholder="Email"
      required
      name="email"
      value={email}
      onChange={handleInputChange}
      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />

    <input 
      type="password"
      placeholder="Password"
      required
      name="password"
      value={password}
      onChange={handleInputChange}
      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <input 
      type="password"
      placeholder="Confirm Password"
      required
      name="cPassword"
      value={cPassword}
      onChange={handleInputChange}
      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <button 
      type="submit"
      className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
    >
      Register
    </button>
  </form>
  <div className="mt-4 text-center">
    <p>Already have an account?</p>
    <Link to="/login" className="text-blue-400 font-bold py-2 px-4 rounded">Login</Link>
  </div>
</div>


      </Card>
{/* 
      <div className={styles.img}>
        <img src={loginImg} alt = "Login" width = "400" />
      </div> */}


    </section>
    </>
  )
}

export default Register