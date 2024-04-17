const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const Apifeatures = require("../utils/apiFeatures");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;


// create Product ---Admin
const createProduct = asyncHandler(async(req, res, next) =>{
    const {name , category, Stock, price, description} = req.body;
    console.log(req.body);

   
    
    //  vallidation
    if (!name  || !price || !category || !Stock  || !description ){
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
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
        

    }
    console.log(fileData);

    const product = await Product.create({
        user: req.user.id,
        name,
        price,
        category, 
        Stock,
        description,
        image: fileData,
    });

    res.status(201).json({
        success:true,
        product
    })
});


// get all Products
const getAllProducts = asyncHandler(async(req,res,)=>{

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apifeature = new Apifeatures(Product.find(),req.query)
    .search()
    .filter()
    // .pagination(resultPerPage);


    
    let products = await apifeature.query;
    let filteredProductsCount = products.length;
    apifeature.pagination(resultPerPage);

    // console.log('Initial values:');
    // console.log('productsCount:', productsCount);
    // console.log('resultPerPage:', resultPerPage);
    // console.log('filteredProductsCount:', filteredProductsCount);

    res.status(200).json({
        
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    })
});

// get all Products Admin
const getAdminProducts = asyncHandler(async(req,res, next)=>{
    const products = await Product.find();
    
    res.status(200).json({
        success:true,
        products,       
    });
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
        
    })
   
});

// Update Product -- Admin
const updateProduct = asyncHandler(async(req,res, next)=>{
    const {name , category, Stock, price, description} = req.body;
   
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
        Stock,
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

// createPrtoductReview
const createPrtoductReview = asyncHandler(async(req,res, next)=>{
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews &&  product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;
      await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });


});


// get all Prtoduct Review
const getProductReview = asyncHandler(async(req,res, next)=>{

    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });

});

// Delete Review
const deleteReview = asyncHandler(async(req,res, next)=>{
    const product = await Product.findById(req.query.productID);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    reviews.forEach((rev) =>{
        avg += rev.rating;
    })
    let ratings = 0;
    
    if(reviews.length === 0){
        ratings =0;

    } else{
        ratings = avg/reviews.length;
    }
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
        req.query.productID,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
    res.status(200).json({
        success:true,
    });

});





module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createPrtoductReview,
    getProductReview,
    deleteReview,
    getAdminProducts,
};
