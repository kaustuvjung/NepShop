import React, { useEffect, useState } from "react";
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
import { subDays, startOfWeek, endOfWeek, format } from "date-fns";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.allOrders);

  let OutOfStock = 0;
  products && products.forEach((item) => {
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

  useEffect(() => {
    if (user) {
      if (user.role !== "admin") {
        navigate("/");
      }
    }
  }, [user, navigate]);

  // Calculate weekly income
  const [weeklyIncome, setWeeklyIncome] = useState([]);
  useEffect(() => {
    const calculateWeeklyIncome = () => {
      const weekIncome = [];
      for (let i = 6; i >= 0; i--) {
        const date = format(subDays(new Date(), i), "yyyy-MM-dd");
        const dayIncome = orders
          ? orders
              .filter((order) => format(new Date(order.createdAt), "yyyy-MM-dd") === date)
              .reduce((total, order) => total + order.totalPrice, 0)
          : 0;
        weekIncome.push({ date, income: dayIncome });
      }
      setWeeklyIncome(weekIncome);
      console.log(weekIncome);
    };
    calculateWeeklyIncome();
  }, [orders]);

  const totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0) || 0;

  const lineState = {
    labels: weeklyIncome.map((data) => data.date),
    datasets: [
      {
        label: "Daily Income",
        backgroundColor: "tomato",
        hoverBackgroundColor: "rgba(197, 72, 49, 0.8)",
        data: weeklyIncome.map((data) => data.income),
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [OutOfStock, products ? products.length - OutOfStock : 0],
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
                    <p>Products</p>
                    <p>{products ? products.length : 0}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders ? orders.length : 0}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users ? users.length : 0}</p>
                  </Link>
                </div>
              </div>
              <div className="lineChart">
                <Line data={lineState} />
              </div>
              <div className="doughnutChart">
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