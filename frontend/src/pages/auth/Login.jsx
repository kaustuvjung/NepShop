import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../component/Card/Card";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils/Index";
import Loader from "../../component/layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_AUTH,
  login,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import PasswordInput from "../../component/layout/passwordInput/PasswordInput";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn, isSuccess, message, isError, twoFactor } =
    useSelector((state) => state.auth);

  const LoginUser = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    e.preventDefault();

    // if any input filed is empty
    if (!email || !password) {
      return toast.error("All Field Are Required");
    }
    // validate email
    if (!validateEmail(email)) {
      return toast.error("Please enter a Valid email");
    }

    const userData = {
      email,
      password,
    };
    // console.log(userData);
    const data = await dispatch(login(userData));
    console.log(data);

    if (data.payload.role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate(redirect);
    }
    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }
    dispatch(RESET_AUTH());
  }, [
    isLoggedIn,
    isSuccess,
    dispatch,
    navigate,
    isError,
    twoFactor,
    redirect,
    email,
  ]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}

      <Card>
        <div className={styles.form}>
          <h2 className="font-bold text-lg mt-6 mb-12 text-danger text-center">
            Welcome to NepShop Please login.
          </h2>

          <form onSubmit={LoginUser}>
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

            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>

          <Link to="/forgot">Forgot Password</Link>

          <span className={styles.register}>
            <p> &nbsp; Don't have an account? &nbsp;</p>

            <Link to="/register">Register</Link>
          </span>
          <br />
          {/* <p className="--text-center --fw-bold">or</p>
          <div className="--flex-center">
            <button className="--btn --btn-google">Login With Google</button>
          </div> */}
        </div>
      </Card>
    </div>
  );
};

export default Login;
