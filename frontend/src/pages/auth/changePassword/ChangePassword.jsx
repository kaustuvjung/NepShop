import React, { useState } from 'react';
import './ChangePassword.scss'
import PasswordInput from '../../../component/layout/passwordInput/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../../component/layout/loader/Loader';
import Card from '../../../component/Card/Card';
import { RESET_AUTH, changePassword, logout } from '../../../redux/features/auth/authSlice';
import { sendAutomatedEmail } from '../../../redux/features/email/emailSlice';



const initialState = {
  oldPassword: "",
  password: "",
  cPassword: "",
};


const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, cPassword } = formData;
  const { isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !cPassword) {
      return toast.error("All fields are required");
    }

    if (password !== cPassword) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      oldPassword,
      password,
    };
    // Add logic to dispatch password update action
    const emailData = {
      subject: "Password Changed - NepShop",
      send_to: user.email,
      reply_to: "noreply@NepShop",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET_AUTH(userData));
    navigate("/login");
  };


  return (
    <>
      <section>
        <div className=" container">
       
          <div className="--flex-center change-password">
         
            <Card cardClass={"card"}>
              <>
                <form onSubmit={updatePassword}>
                  <p>
                    <label>Current Password</label>
                    <PasswordInput
                      placeholder="Old Password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>confirm New Password:</label>
                    <PasswordInput
                      placeholder="Confirm Password"
                      name="cPassword"
                      value={cPassword}
                      onChange={handleInputChange}
                    />
                  </p>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-danger --btn-block"
                    >
                      Change Password
                    </button>
                  )}
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
