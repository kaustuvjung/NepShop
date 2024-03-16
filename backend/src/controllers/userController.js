const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const User = require("../models/userModel");


// token Generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};


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
    if (userExits){
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
    const token  = generateToken(user._id)
    
    if(user){
        const { _id, name, email, role} = user

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: none,
        })
        // send user data
        res.status(201).json({
            _id,
            name,
            email, 
            role, 
            token
        })
    }else {
        res.status(400);
        throw new Error ("Invalid user data");
    }
    
    // res.send("Register User....!!");
});
// Login User
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    // vailidate user  request
    if(!email || !password) {
        res.status(400);
        throw new Error("Please add email and password");
    }
    // check if user exist
    const user = await User.findOne({ email });
    if ( !user) {
        res.status(400);
        throw new Error("User does not exists.")

    }

    // user exist check if passwor is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    
    // generate Token 
    const token = generateToken(user._id);
    if (user && passwordIsCorrect) {
        const newUser = await User.findOne({ email }).select("-password");
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: none,
        });
        // send user data
        res.status(201).json(newUser);
    } else {
        res.status(400);
        throw new Error("Invalid email or Password");
    }
    // res.send("Login User !!!....");
});

const Logout = asyncHandler ( async (req, res ) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        // secure: true,
        // sameSite: none,
    });
    return res.status(200).json({message : " Sucessfully Logged out....!!"})
    // res.send("-------Logout---- !!!....");
});

// Get User 
const getUser = asyncHandler (async (req, res) => {
   const user =  await User.findById(req.user._id).select("-password");
   if(user){
    res.status(200).json(user)
   }else{
    res.status(400)
    throw new Error("User Not found")
   }
});
// Get login  Status
const  getLoginStatus= asyncHandler (async ( req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false)               
    }  
    // verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET );
    if (verified) {
        res.json(true)               
    } 
    res.json(false)
});

// Update user data
const  updateUser= asyncHandler (async ( req, res) => {
    const user =  await User.findById(req.user._id);

    if (user) {
        const { name, phone, address} = user;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;

        const updatedUser =  await user.save();
        res.status(200).json(updatedUser);        
    } else {
        res.status(404);
        throw new Error( " User not found");
    }

});
// Update user photo
const  updatePhoto= asyncHandler (async ( req, res) => {
    const { photo } = req.body;
    const user =  await User.findById(req.user._id);
    user.photo = photo 
    const updatedUser =  await user.save();
    res.status(200).json(updatedUser);        
  });

module.exports = {
    registerUser,
    loginUser,
    Logout,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto,
};