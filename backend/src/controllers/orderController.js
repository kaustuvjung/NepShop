const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

// craete new order
const newOrder = asyncHandler(async(req,res)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
    
      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });
    
      res.status(201).json({
        success: true,
        order,
      }); 
});

// getSingleOrder
const getSingleOrder = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
    
   
});

// get logged  in user Order
const myOrders = asyncHandler(async(req,res)=>{
  const orders = await Order.find({ user : req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
    
   
});

// get all Order -- admin
const getAllOrders = asyncHandler(async(req,res)=>{
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) =>{
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
    
   
});


// update Order Status -- Admin
const updateOrder = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // if (req.body.status === "Shipped") {
  //   order.orderItems.forEach(async (o) => {
  //     await updateStock(o.product, o.quantity);
  //   });
  // }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
   
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
const deleteOrder = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
   
});

module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
};