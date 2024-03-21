import React, { useState } from 'react';
import styles from "./auth.module.scss";
import loginImg from "../../assets/Login.png";
// import Card from '.';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    // Implement login logic here
  }

  return (
    <section className={`${styles.auth} container`}>
      {/* <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div> */}

      <Card>
          <div className={`w-96 p-6 animate-slide-up`}>
      <h2 className="font-bold text-lg text-danger text-center">Welcome to NepShop! Please login.</h2>
      <form onSubmit={loginUser} className="mt-4">
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>Don't have an account?</p>
        <Link to="/register" className="text-blue-400 font-bold py-2 px-4 rounded">Register</Link>
      </div>
    </div>

      </Card>
    </section>
  );
}

export default Login;
