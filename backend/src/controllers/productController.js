const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const Apifeatures = require("../utils/apiFeatures");

// create Product ---Admin
const createProduct = asyncHandler(async(req, res, next) =>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

// get all Products
const getAllProducts = asyncHandler(async(req,res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apifeature = new Apifeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apifeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount
    })
});


// get  Products details
const getProductDetails = asyncHandler(async(req,res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not found", 404))
    }
    res.status(200).json({
        success:true,
        product,
        // productCount
    })
   
});

// Update Product -- Admin
const updateProduct = asyncHandler(async(req,res, next)=>{
    let product =Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidattors:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
   
   
});

// Delete Product -- Admin
const deleteProduct = asyncHandler(async(req,res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not found", 404))
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message: "Product deleted sucessfully"
    })

});

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
};
