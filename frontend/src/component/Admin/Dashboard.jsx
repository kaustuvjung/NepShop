import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dsahboard.css";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/auth/authSlice";
import Loader from "../layout/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

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
} from "chart.js";
import { getAdminProduct } from "../../redux/action/productAction";
import isAdminRedirect from "../../customHook/isAdminRedirect";

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
  // useRedirectLoggedOutUser("/login");
  isAdminRedirect();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );

  const { orders } = useSelector((state) => state.allOrders);

  let OutOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        OutOfStock += 1;
      }
    });

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }

    dispatch(getAdminProduct());
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
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgba(197, 72 49"],
        data: [0, totalAmount],
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
        data: [OutOfStock, products.length - OutOfStock],
      },
    ],
  };
  const isAdmin = user?.role === "admin";

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && isAdmin && (
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
                    Rs{totalAmount}
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
                  </Link>
                </div>
              </div>
              <div className="lineChart">
                <Line data={lineState} />
              </div>

              <div className="doughnutChart">
                Your doughnut chart
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
