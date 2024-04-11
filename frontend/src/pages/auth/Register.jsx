import React, { useEffect, useState } from 'react';
import  styles from "./auth.module.scss";
import Card from '../../component/Card/Card';
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/Index';
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register, sendVerificationEmail } from '../../redux/features/auth/authSlice';
import Loader from '../../component/layout/loader/Loader';
import PasswordInput from '../../component/layout/passwordInput/PasswordInput';



const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, cPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector((state) => state.auth);
  
  const [uCase ,setUCase] = useState(false);
  const [num ,setNum] = useState(false);
  const [sChar ,setSChar] = useState(false);
  const [passLength ,setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition)  =>{
    if(condition){
      return checkIcon
    }
    return timesIcon
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    useEffect(() =>{
      //check lower case and upper case      
      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        setUCase(true);
      } else {
        setUCase(false);
      }
      // Check for numbers
      if (password.match(/([0-9])/)) {
        setNum(true);
      } else {
        setNum(false);
      }
      // Check for special character
      if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        setSChar(true);
      } else {
        setSChar(false);
      }
      // Check for PASSWORD LENGTH
      if (password.length > 5) {
        setPassLength(true);
      } else {
        setPassLength(false);
      }
    },[password]); 

    const registerUser = async (e) => {
      e.preventDefault();
      console.log(name, email, password, cPassword);
      
      // if any input filed is empty
      if(!name || !email || !password){
        return toast.error("All Field Are Required");
      }
      // validate email
      if(!validateEmail(email)){
        return toast.error("Please enter a Valid email");
      }
             
      // check password lenght
      if(password.length <6){
        return toast.error("Password Must be up to 6 character");
      }
  
      // check if password and confirm password is match
      if(password !== cPassword){
        return toast.error("Password doesnot match. Please enter a correct match");
      }

      const userData ={
        name,
        email,
        password
      }
      // console.log(userData);
      await dispatch(register(userData));
      await dispatch(sendVerificationEmail());

    };

  useEffect(() =>{
    if(isSuccess && isLoggedIn){
      navigate("/")
    }
    dispatch(RESET_AUTH())
  },[isLoggedIn, isSuccess, dispatch, navigate]);



return (
  <div className={`container ${styles.auth}`}>
    {isLoading && <Loader/>}

    <Card>
      <div className={styles.form}>
       
        <h2>Create your NepShop Account</h2>
        
        <form onSubmit={registerUser} >
          
        <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
          />
           <PasswordInput
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <PasswordInput
            placeholder="Confirm Password"
            name="cPassword"
            value={cPassword}
            onChange={handleInputChange}
            onPaste={(e) => {
              e.preventDefault();
              toast.error("Cannot paste into input field");
              return false;
            }}
          />

             {/* Password Strength */}
             <Card cardClass={styles.group}>

            <ul className="form-list">
              <li>
                <span className={styles.indicator}>
                  {switchIcon(uCase)}
                  &nbsp; Lowercase & Uppercase
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(num)}
                  &nbsp; Number (0-9)
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(sChar)}
                  &nbsp; Special Character (!@#$%^&*)
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(passLength)}
                  &nbsp; At least 6 Character
                </span>
              </li>
            </ul>
          </Card>
       
          <button type="submit" className="--btn --btn-primary --btn-block">
            Register
          </button>
        </form>

        <span className={styles.register}>
          <p> &nbsp; Already have an Account &nbsp;</p>
    
          <Link to="/login">Login</Link>
        </span>
        <br />
       

      </div>
    </Card>
  </div>
);
};

export default Register;