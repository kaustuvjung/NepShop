import React, { Fragment, useEffect, useRef } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import axios from 'axios';
import './payment.css';
import { toast } from 'react-toastify';
import { clearErrors, createOrder } from '../../redux/action/orderAction';
import { useNavigate } from 'react-router-dom';

const CashPayment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); 
    const dispatch = useDispatch();
    const payBtn = useRef(null);
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
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

    const handleApi = async () => {
      const payload ={
        "return_url": "http://localhost:5173/products",
        "website_url": "http://localhost:5173",
        "amount": paymentData.amount, // Use the payment amount from paymentData
        "purchase_order_id": "test12",
        "purchase_order_name": "test",
        "customer_info": {
            "name": "Khalti Bahadur",
            "email": "example@gmail.com",
            "phone": "9800000123"
        },
      };

      try {
        const response = await axios.post("http://localhost:8000/khalti-api", payload);
        console.log(response);
        if (response.data.success) {
          window.location.href = response.data.data.payment_url;
        } else {
          toast.error("Failed to initiate Khalti payment");
          payBtn.current.disabled = false;
        }
      } catch (error) {
        toast.error("Error initiating Khalti payment");
        payBtn.current.disabled = false;
      }
    };

    const submitHandler = async (e) => {
      e.preventDefault();
  
      payBtn.current.disabled = true;
  
      try {
        await handleApi();
        
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
            <Typography>Khalti With Khalti</Typography>
  
            <input
              type="submit"
              value={`Pay - Rs${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </Fragment>
    );
};

export default CashPayment;
