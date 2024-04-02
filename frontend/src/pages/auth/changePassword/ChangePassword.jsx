import React, { useState } from 'react';
import './ChangePassword.scss'
import PasswordInput from '../../../components/passwordInput/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../../components/loader/Loader';
import PageMenu from '../../../components/pageMenu/PageMenu';
import Card from '../../../components/Card/Card';



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

    // Add logic to dispatch password update action
  };

  return (
    <>
      <section>
        <div className=" container">
          <PageMenu />
          <h2 className="--flex-center mt-4 text-red">Change Password</h2>
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
