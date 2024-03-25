const ErrorHandler =require("../utils/errorhandler");

const errorHandler = (err, req, res, next) => {
    // const statusCode = res.statusCode ? res.statusCode : 500;
    err.statusCode = err.statusCode ||500;
    err.message = err.message || "internal Server error";
    // res.status(statusCode)
    // Wrong Mongodb Id error 
    if(err.name == "CastError"){
        const message = `Resources not found . Invalid : ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode)

    res.json({
        success:false,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack: null,       
        
    })
};

module.exports = errorHandler;
