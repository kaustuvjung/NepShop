const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler( async ( req, res, next) => {
    
    try {
        const token = res.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Mot authorized, please Login");               
        }  
        
    // verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET );
    // get user if from token 
    const user  = await User.findById(verified._id).select("-password");

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    req.user = user;
    next()

    } catch (error) {
        res.status(401);
        throw new Error("Mot authorized, please Login");    
    }
});
module.exports = {
    protect,
}