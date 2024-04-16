import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../redux/action/orderAction';

const CashOnDelivery = ({ order }) => {
  const [contactInfo, setContactInfo] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContactInfoChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleCashOnDelivery = () => {
    const orderData = { ...order, contactInfo };
    dispatch(createOrder(orderData));
    navigate('success');
  };

  return (
    <div>
      {/* Form for collecting contact information */}
      <input type="text" name="name" placeholder="Name" onChange={handleContactInfoChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleContactInfoChange} />
      {/* Add more fields as needed */}

      <button onClick={handleCashOnDelivery}>Confirm Order</button>
    </div>
  );
};

export default CashOnDelivery;
