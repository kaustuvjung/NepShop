const express = require("express");
const { 
    getAllProducts, 
    createProduct, 
    updateProduct,
    deleteProduct, 
    getProductDetails, 
    createPrtoductReview
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const { protect, adminOnly } = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/products" , getAllProducts);
router.post("/admin/product/new", protect, adminOnly, upload.single("image"), createProduct);
router.patch("/admin/product/:id",protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/admin/product/:id", protect, adminOnly, deleteProduct);

router.get("/product/:id", getProductDetails);
router.patch("/review",protect, createPrtoductReview);




module.exports = router;