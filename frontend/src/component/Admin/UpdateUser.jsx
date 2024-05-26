import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { FaCheck } from "react-icons/fa";
import { EMAIL_RESET, sendAutomatedEmail } from "../../redux/features/email/emailSlice";
import { getUsers, upgradeUser } from "../../redux/features/auth/authSlice";
import Loader from "../layout/loader/Loader";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState("");
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector((state) => state.auth);

 

  // Change User role
  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error("Please select a role");
    }

    const userData = {
      role: userRole,
      id: _id,
    };

    const emailData = {
      subject: "Account Role Changed - NepShop",
      send_to: email,
      reply_to: "noreply@nepshop",
      template: "changeRole",
      url: "/login",
    };

    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    dispatch(EMAIL_RESET());
  };




  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {isLoading ? (
            <Loader />
          ) : (
            <form
        className="flex"
        onSubmit={(e) => changeRole(e, _id, userRole)}
      >
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="">-- select --</option>
          <option value="customer">customer</option>
          <option value="admin">Admin</option>
        </select>
        
        <button className="--btn --btn-primary">
          <FaCheck size={15} />
        </button>
      </form>
    
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;