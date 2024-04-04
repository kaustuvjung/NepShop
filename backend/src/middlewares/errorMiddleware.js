const ErrorHandler = require("../utils/errorhandler");

const errorHandler = (err, req, res, next) => {
    // Set default status code and message if not provided
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Check if error is a CastError
    if (err.name === "CastError") {
        const message = "Resource not found. Invalid ID.";
        err = new ErrorHandler(message, 400);
    }

    // Send response only if headers haven't been sent yet
    if (!res.headersSent) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === "development" ? err.stack : null,
        });
    }
};

module.exports = errorHandler;
