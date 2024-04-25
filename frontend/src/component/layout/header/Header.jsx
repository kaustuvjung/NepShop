import { Fragment, useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { RESET_AUTH, logout } from "../../../redux/features/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../../protect/hiddenLink";
import { UserName } from "../../../pages/profile/Profile";
import cart_icon from "../../../assets/cart_icon.png";
import "./Header.css";
import Search from "../../Product/Search";
import UserOptions from "./UserOptions";

const Logo = (
  <div className="flex lg:flex-1">
    <span className="sr-only">Your Compay</span>
    <Link to="/"> NEPSHOP</Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? "relative text-danger" : "");

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await dispatch(RESET_AUTH());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className=" bg-gray-900 text-white font-sans">
      <nav
        className=" flex items-center justify-between p-6 mx-11 sticky z-50"
        aria-label="Global"
      >
        <div className="flex ml-24"> {Logo}</div>

        <div className="flex  space-x-10 items-center justify-center">
          <div>
            <NavLink
              to={"/products"}
              className={`text-sm font-semibold leading-6 text-white " ${activeLink}`}
            >
              Product
            </NavLink>
          </div>
          <div className="flex space-x-10">
            <ShowOnLogout>
              <div className=" ">
                <NavLink
                  to={"/login"}
                  className={`text-sm font-semibold leading-6 text-white ${activeLink}`}
                >
                  Login
                </NavLink>
              </div>
              <div className="capitalize ">
                <NavLink
                  to={"/register"}
                  className={`text-sm font-semibold leading-6 text-white ${activeLink}`}
                >
                  Register
                </NavLink>
              </div>
            </ShowOnLogout>

            <div>
              <ShowOnLogin>
                <UserOptions />
              </ShowOnLogin>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
