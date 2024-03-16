import React, { useState } from 'react';
import styles from "./auth.module.scss";
import loginImg from "../../assets/Login.png";
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    // Implement login logic here
  }

  return (
    <section className={`${styles.auth} container`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>

      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </form>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
}

export default Login;
