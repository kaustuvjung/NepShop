const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");


const router = express.Router();



router.post("/order/new", protect, newOrder);

router.get("/order/:id", protect,  getSingleOrder );
router.get("/orders/me", protect, myOrders );
router.get("/admin/orders", protect,adminOnly, getAllOrders );

router.put("/admin/orders/:id", protect,adminOnly, updateOrder);
router.delete("/admin/orders/:id", protect,adminOnly, deleteOrder );



module.exports = router;    