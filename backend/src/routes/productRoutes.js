const express = require("express");
const { 
    getAllProducts, 
    createProduct, 
    updateProduct,
    deleteProduct, 
    getProductDetails, 
    createPrtoductReview,
    getProductReview,
    deleteReview,
    getAdminProducts
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const { protect, adminOnly } = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/products" , getAllProducts);
router.post("/admin/product/new", protect, adminOnly, upload.single("image"), createProduct);
router.patch("/admin/product/:id",protect, adminOnly, upload.single("image"), updateProduct);
router.get("/admin/products",protect, adminOnly,  getAdminProducts );
router.delete("/admin/product/:id", protect, adminOnly, deleteProduct);

router.get("/product/:id", getProductDetails);
router.patch("/review",protect, createPrtoductReview);
router.get("/reviews", getProductReview);
router.delete("/reviews",protect, deleteReview);



module.exports = router;