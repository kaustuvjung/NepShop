import React, { useState } from 'react';
import  styles from "./auth.module.scss";
import loginImg from "../../assets/Login.png";
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
}; 

const Register = () => {
 const [formData, setFormData] = useState(initialState);
 const { name, email, password, cPassword} = formData;

 const handleInputChange = (e) => {
  const { name, value} = e.target
  setFormData({ ...formData, [name] : value })

 };



  const registerUser = () => {
    
  }
  return (
    <section className={`container ${styles.auth}`}>
          
      <Card>
      <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
        <input 
        type="text"
        placeholder="Name"
        required
        name={name}
        value={email}
        onChange={handleInputChange} 
        />
        <input 
        type="text"
        placeholder="Email"
        required
        name={email}
        value={email}
        onChange={handleInputChange} 
        />
        <input 
        type="password"
        placeholder="Password"
        required
        name={password}
        value={password}
        onChange={handleInputChange} 
        />
        <input 
        type="password"
        placeholder="Cnfirm Password"
        required
        name={cPassword}
        value={password}
        onChange={handleInputChange} 
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register
        </button>


        </form>
        <span className={styles.register}>
          <p>Already have an account?</p>
          <Link to="/login"  className="text-blue-400 font-bold py-2 px-4 rounded">Login</Link>        
        </span>
        
      </div>

      </Card>
      <div className={styles.img}>
        <img src={loginImg} alt = "Login" width = "400" />
      </div>


    </section>
  )
}

export default Register