import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import styles from "./auth.module.scss";
import PasswordInput from "../../Component/layout/passwordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, resetPassword } from "../../redux/features/auth/authSlice";
import Card from '../../Component/Card/Card';
import Loader from '../../Component/layout/loader/Loader';

const initialState = {
    password: "",
    cPassword: "",
  };

const Reset = () => {
    const [formData, setFormData] = useState(initialState);
    const { password, cPassword } = formData;

    const { resetToken } = useParams();
    console.log(resetToken);
  
    const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
      (state) => state.auth
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const reset = async (e) => {
      e.preventDefault();
  
      if (password.length < 6) {
        return toast.error("Password must be up to 6 characters");
      }
      if (password !== cPassword) {
        return toast.error("Passwords do not match");
      }
  
      const userData = {
        password,
        cPassword,
      };
  
      await dispatch(resetPassword({ userData, resetToken }));
      
    };
  
    useEffect(() => {
      if (isSuccess && message.includes("Reset Successful")) {
        navigate("/login");
      }
  
      dispatch(RESET_AUTH());
    }, [dispatch, navigate, message, isSuccess]);
  
    

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset} >
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
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
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

export default Reset;