const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const User = require("../models/userModel");

// token Generation
const generateToken = () => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : "1d"
    })

}

// Register User 
const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password} = req.body;

    // validatiion of request
    if (!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all required field");
    }
    if (password.length <6 ){
        res.status(400);
        throw new Error("password must be up to 6 characters");
    }

    // check if uses exists 
    const userExits = await User.findOne({email: email})
    if (userexits){
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // create new Users 
    const user = await User.create({
        name, 
        email,
        password
    })

    // Generate Token
    const Token  = generateToken(user._id)
    
    if(user){
        const {_id, name, email, role} = user
        res.cookie("token", Token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            secure: true,
            sameSite: none,
        })
        // send user data
        res.status(201).json({
            _id,
            name,
            email, 
            role, 
            Token
        })
    }else {
        res.status(400);
        throw new Error ("Invalid user data");
    }
    
    res.send("Register User....!!");
});

module.exports = {
    registerUser,
};