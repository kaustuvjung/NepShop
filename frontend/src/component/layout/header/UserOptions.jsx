import React, { Fragment } from 'react';
import "./Header.css";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, logout, selectUser } from '../../../redux/features/auth/authSlice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { Backdrop } from '@mui/material';
// import Dashboard from '@mui/icons-material/Dashboard';

const UserOptions = () => {
  const [open , setOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    { icon: <ListAltOutlined />, name: 'orders',func: order },
    { icon: <PersonIcon/>, name: 'Account',func: account },
    { icon: <ExitToApp />, name: 'logOut', func: logoutUser },
  ];
  
  if( user?.role ==="admin"){
    options.unshift( { 
      icon: < DashboardIcon/>, 
      name: 'Dashboard', 
      func: dashboard, 
    })
  }

function dashboard() {
  navigate("/dashboard")
}

function order() {
  navigate("/orders")
}

function account() {
  navigate("/profile")
}

async function logoutUser() {
  await dispatch(RESET_AUTH());
  await dispatch(logout());
  navigate("/login");
}

  

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}} />
      <SpeedDial
         ariaLabel="SpeedDial basic example"
         onClose={() => setOpen(false)}
         onOpen={() => setOpen(true)}
         open={open}
         style={{zIndex:"11"}}
         direction='down'
         className='speedDial'
         icon={
          <img 
            className='speedDialIcon'
            src={user?.photo} 
            alt="profile image" 
            />
            
         }
         
      >
       
      {options.map((item) =>(
         <SpeedDialAction 
          key={item.name}
          icon={item.icon} 
          tooltipTitle={item.name} 
          onClick={item.func}/>

      ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
