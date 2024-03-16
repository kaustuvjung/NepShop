const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const User = require("../models/userModel");


// Register User 
const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password} = req.body;

    // validatiion of request
    if (!name || !email || !password){
        res.status(400);
        throw newError("Please fill in all required field");
    }
    if (password.length <6 ){
        res.status(400);
        throw newError("password must be up to 6 characters");
    }

    // check if uses exists 
    const userExits = await User.findOne({email: email})
    if (userexits){
        res.status(400);
        throw newError("Email has already been registered");
    }

    // create new Users 
    const user = await User.create({
        name, 
        email,
        password
    })




    res.send("Register User....!!");
});

module.exports = {
    registerUser,
};