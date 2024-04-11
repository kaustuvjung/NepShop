const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const Apifeatures = require("../utils/apiFeatures");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;


// create Product ---Admin
const createProduct = asyncHandler(async(req, res, next) =>{
    const {name , category, stock, price, description} = req.body;
    
    //  vallidation
    if (!name  || !price || !category || !stock  || !description ){
        res.status(400);
        throw new Error("please fill all the fields")
    }
   
    // handle image upload
    let fileData = {};
    if(req.file){
        let uploadFile;
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path, {
              folder: "Nepshop App",
              resource_type: "image",
            });
          } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
          }
        fileData = {
            fileName: req.file.originalname,
            filepath: uploadFile.secure_url,
            // filepath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
        

    }

    const product = await Product.create({
        name,
        price,
        category, 
        stock,
        description,
        image: fileData,
    });

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
    // .pagination(resultPerPage);
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
    const {name , category, stock, price, description} = req.body;
   
    const product =Product.findById(req.params.id);

    // let product =Product.findById(req.params.id);
    console.log("Request Body:", req.body); // Log request body
    console.log("Product ID:", req.params.id); // Log product ID
    if(!product){
        return next(new ErrorHandler("Product Not found", 404))
    }

    // handle image upload
    let fileData = {};
    if(req.file){
        let uploadFile;
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path, {
              folder: "Nepshop App",
              resource_type: "image",
            });
          } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
          }
        fileData = {
            fileName: req.file.originalname,
            filepath: uploadFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    }


    const productUpdate = await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        category, 
        stock,
        description,
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
        
    },{
        new:true,
        runValidattors:true,
        // useFindAndModify:false
    });



    res.status(200).json({
        success:true,
        productUpdate
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
