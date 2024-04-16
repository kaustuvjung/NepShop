import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import './dsahboard.css';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import { Link, useNavigate,  } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/features/auth/authSlice';
import Loader from '../layout/loader/Loader';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,

  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);


  useEffect(() => {
    if(user === null){
        dispatch(getUser());
    }
  }, [dispatch, user]);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Amount Eranend Total',
//     },
//   },
// };


  const lineState ={
    labels:["Initial Amount", "Amount Earned"],
    datasets:[
      {
        label: "total Amount",
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgba(197, 72 49"],
        data: [0, 4000],
      },
    ],

  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        // data: [outOfStock, products.length - outOfStock],
        data: [2, 10],

      },
    ],
  };
  const isAdmin = user?.role === "admin";

  

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return null; // or a loading component
  }


  if (isAdmin) {
    // Admin dashboard
    return (
      <>
          <div className="dashboard">
          <MetaData title="Dashboard - Admin Panel" />
          <Sidebar />
          <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 
              {/* ${totalAmount} */}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              {/* <p>{products && products.length}</p> */}
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* <p>{users && users.length}</p> */}
            </Link>
          </div>
            </div>
            <div className="lineChart">
             <Line  data={ lineState } />
            </div>
            
            <div className="doughnutChart">
            Your doughnut chart
            <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    // Redirecting non-admin users to home page
    navigate("/");
    return null;
  }
}

export default Dashboard
