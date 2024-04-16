import React, { Fragment, useEffect, useRef, useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@mui/material'
import axios from 'axios'
import './payment.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearErrors, createOrder } from '../../redux/action/orderAction'

const CashPayment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const payBtn = useRef(null);
  
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { error } = useSelector((state) => state.newOrder);
  
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };
  
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      payBtn.current.disabled = true;
  
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
       
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const { data } = await axios.post(
            BACKEND_URL + "/api/v1/payment/process",
            paymentData,
            config
        );
  
      
        dispatch(createOrder(order));
        navigate("/success");
        
      } catch (error) {
        payBtn.current.disabled = false;
        toast.error(error.response.data.message);
      }
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
    }, [dispatch, error]);
  
    return (
      <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>

            <div>
              <CreditCardIcon />
            
            </div>
            <div>
              <EventIcon />
            
            </div>
            <div>
              <VpnKeyIcon />
            </div>
  
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </Fragment>
    );
  };

export default CashPayment
