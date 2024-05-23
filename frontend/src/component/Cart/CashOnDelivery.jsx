import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { createOrder, clearErrors } from "../../redux/action/orderAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

const CashOnDelivery = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const history = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    const submitOrder = async () => {
      try {
        const order = {
          shippingInfo,
          orderItems: cartItems,
          itemsPrice: orderInfo.subtotal,
          taxPrice: orderInfo.tax,
          shippingPrice: orderInfo.shippingCharges,
          totalPrice: orderInfo.totalPrice,
          paymentInfo: {
            type: "Cash On Delivery",
            status: "Pending",
          },
        };
  
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        dispatch(createOrder(order));
        history("/success");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  
    submitOrder();
  }, []); 
  
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
        <Typography variant="h6">Payment Method: Cash On Delivery</Typography>
      </div>
    </Fragment>
  );
};

export default CashOnDelivery;
