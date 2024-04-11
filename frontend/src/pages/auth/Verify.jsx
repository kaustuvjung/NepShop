import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RESET_AUTH, verifyUser } from "../../redux/features/auth/authSlice";
import Loader from '../../component/layout/loader/Loader';

const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const { isLoading } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET_AUTH());
  };

  return (
    <section>
      {isLoading && <Loader />}
      <div className="--center-all">
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <br />
        <button onClick={verifyAccount} className="--btn --btn-primary">
          Verify Account
        </button>
      </div>
    </section>
  );
};

export default Verify;