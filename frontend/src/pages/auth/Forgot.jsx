import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, forgotPassword } from "../../redux/features/auth/authSlice";
import { validateEmail } from '../../utils/Index';
import Card from '../../component/Card/Card';
import Loader from '../../component/layout/loader/Loader';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET_AUTH(userData));
  };


  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            
            <div className={styles.links}>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;