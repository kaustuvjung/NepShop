import React from 'react';
import logo from "../../assets/download.svg";
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ExitToApp from "@mui/icons-material/ExitToApp";
import { useDispatch } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await dispatch(RESET_AUTH());
    await dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
          <PostAddIcon />
          Products
        </p>
      </Link>
      <Link to="/admin/product">
        <p>
          <AddIcon />
          Create
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      <div onClick={logoutUser} className="logout">
        <p>
          <ExitToApp />
          LogOut
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
