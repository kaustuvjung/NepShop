import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./component/layout/header/Header";
import Fotter from "./component/layout/footer/Fotter";
import Home from "./component/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ConfirmOrder, MyOrders } from "./routes/Routes";
import Profile from "./pages/profile/Profile";
import Shop from "./pages/Shop";
import Cart from "./component/Cart/Cart";
import Forgot from "./pages/auth/Forgot";
import ChangePassword from "./pages/auth/changePassword/ChangePassword";
import Reset from "./pages/auth/Reset";
import Verify from "./pages/auth/Verify";
import LoginWithCode from "./pages/auth/LoginWithCode";
import Product from "./component/Product/Product";
import Search from "./component/Product/Search";
import UpdateProfile from "./pages/profile/UpdateProfile";
import ProductDetails from "./component/Product/ProductDetails";
import Shipping from "./component/Cart/Shipping";
import OrderSuccess from "./component/Cart/OrderSuccess";
import CashPayment from "./component/Cart/CashPayment";
import CashOnDelivery from "./component/Cart/CashOnDelivery";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import Layout from "./component/layout/Layout";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import UserList from "./component/Admin/UserList";
import OrderList from "./component/Admin/OrderList";
import OrderProcess from "./component/Admin/OrderProcess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProductReviews from "./component/Admin/ProductReviews";

const App = () => {
  const dispatch = useDispatch();
  // apply every Http request we made
  axios.defaults.withCredentials = true;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  // const [stripeApikey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  //   const { data } = await axios.get(BACKEND_URL + "/api/v1/stripeapikey");
  //   console.log("Received data from backend:", data);

  //   setStripeApiKey(data.stripeApikey);
  // }

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }

    // getStripeApiKey();
  }, [dispatch, isLoggedIn, user]);

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<Search />} />

        <Route
          path="/products"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        >
          <Route
            path=":keyword"
            element={
              <Layout>
                {" "}
                <Product />{" "}
              </Layout>
            }
          />
        </Route>
        <Route
          path="/product/:id"
          element={
            <Layout>
              {" "}
              <ProductDetails />{" "}
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              {" "}
              <Cart />{" "}
            </Layout>
          }
        />
        <Route
          path="/cashOnDelivery"
          element={
            <Layout>
              {" "}
              <CashOnDelivery />{" "}
            </Layout>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetPassword/:resetToken" element={<Reset />} />
        <Route path="/loginWithCode/:email" element={<LoginWithCode />} />

        <Route
          path="/verify/:verificationToken"
          element={
            <Layout>
              <Verify />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/updateUser"
          element={
            <Layout>
              <UpdateProfile />
            </Layout>
          }
        />

        <Route
          path="/changePassword"
          element={
            <Layout>
              <ChangePassword />
            </Layout>
          }
        />

        <Route
          path="shipping"
          element={
            <ProtectedRoute>
              <Layout>
                <Shipping />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* <Route path="/cashPayment"
       element={
        <ProtectedRoute> 
        <Layout> <CashPayment/> </Layout>
        </ProtectedRoute>
       
       }/> */}

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <OrderSuccess />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <MyOrders />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <ConfirmOrder />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <OrderDetails />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />

        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<OrderList />} />

        <Route path="/admin/order/:id" element={<OrderProcess />} />

        <Route path="/admin/users" element={<UserList />} />

        <Route path="/admin/reviews" element={<ProductReviews />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
