import React, { useEffect, useState } from 'react';
import styles from "./auth.module.scss";
import loginImg from "../../assets/Login.png";
// import Card from '.';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/Index';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, login } from '../../redux/features/auth/authSlice';
import PasswordInput from "../../components/passworInput/PasswordInput"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth);
 
  const loginUser = async (e) => {
    // Implement login logic here
    e.preventDefault();
    if (!email || !password){
      return toast.error("All field are required")
    }
    if (!validateEmail(email)){
      return toast.error("please enter a validate email")
    }
 
    const userData ={
      email,
      password
    };
    console.log(userData);

    await dispatch(login(userData));   
  };
  useEffect(() => {
    if(isSuccess && isLoggedIn){
      navigate("/");
    }
    dispatch(RESET_AUTH());
  },[isSuccess, isLoggedIn, dispatch, navigate]); 

  return (
    <>
    {isLoading  && <Loader />}
    <section className={`${styles.auth} container`}>
      <Card>
     
      <div className={styles.form}>
      <h2 className="font-bold text-lg mt-6 mb-12 text-danger text-center">Welcome to NepShop Please login.</h2>
      <form onSubmit={loginUser} >
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
        />
        <PasswordInput
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        
        />
        <button
          type="submit"
          className="--btn --btn-primary --btn-block"
          // className="--btn --btn-primary --btn-block bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:bg-blue-700"
        >
          Login
        </button>
      </form>

      <Link to="/forgot" className="">Forgot Password</Link>
        <span className={styles.register}>
          <p> &nbsp; Don't have an account? &nbsp;</p>
          
          <Link to="/register" className="">Register</Link>
        </span>
        <br />
        <p className="--text-center --fw-bold ">or</p>
        <div className="--flex-center">
          <button className="--btn --btn-google mb-4">Login With Google</button>

        </div>
      
    </div>

      </Card>
    </section>
    </>
  );
}

export default Login;
