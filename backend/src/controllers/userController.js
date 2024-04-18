const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require('dotenv').config(); 
const bcrypt = require("bcryptjs"); 
const User = require("../models/userModel");
var parser =require('ua-parser-js');
const sendEmail = require("../utils/SendEmail");
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const Cryptr = require('cryptr');
const { generateToken, hashToken } = require("../utils");

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

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
    const userExits = await User.findOne({email})
    if (userExits){
        res.status(400);
        throw new Error("Email has already been registered");
    }

     //Get userAgent
     const ua = parser(req.headers['user-agent']);
     const userAgent = [ua.ua]
  
    // create new Users 
    const user = await User.create({
        name, 
        email,
        password,
        userAgent,
    })

    // Generate Token
    const token  = generateToken(user._id)

    // send Http-only cookie 
    res.cookie("token", token, {
        path:"/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000*86400), // one day
        sameSite: "none",
        secure: true,
    })

    if(user){
        const { _id, name, email,phone, photo, role, isVerified } = user;
        res.status(201).json({
            _id, 
            name, 
            email,
            phone, 
            photo, 
            role, 
            isVerified, 
            token
        });
    }else{
        res.status(400);
        throw new Error("Invalid User data")
    }
    
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
    const user = await User.findOne({ email }).select("+password");
    if ( !user) {
        res.status(400);
        throw new Error("User does not exists.Please register")

    }

     
    
    // user exist check if passwor is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if(!passwordIsCorrect){
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

    // check if user device is authorized
    // trigger two factor authentication for unknown user
    const ua = parser(req.headers['user-agent']);
    const thisuserAgent = ua.ua;
    console.log(thisuserAgent);
    
    const allowedAgent = user.userAgent.includes(thisuserAgent);

    if(!allowedAgent){
        // Generate Six digit Code
        const loginCode = Math.floor( 100000 + Math.random() * 900000);
        console.log(loginCode);

        // Encrypt Login COde token  before save to database 
        const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

         // delete Token if it exists database
         let userToken =await Token.findOne({ userId: user._id });
         if(userToken){
            await userToken.deleteOne();
        }
    
      // save token to db
      await new Token({
          userId : user._id,
          lToken: encryptedLoginCode,
          createdAt : Date.now(),
          expiresAt : Date.now()+ 60 * (60*1000) // one hour
      }) .save();  

      res.status(400);
      throw new Error("New Browser or device Detected");
    
    }

     
    // Generate Token
    const token = generateToken(user._id);
    if(user && passwordIsCorrect){

        // Send GTTP-Only cookie
        res.cookie("token", token,{
            path:"/",
            httpOnly: true,
            expires: new Date(Date.now()+ 1000*86400), // one day
            sameSite: "none",
            secure:true,
        });

        const { _id, name, email,phone,  photo, role, isVerified } = user;
        res.status(200).json({
            _id, 
            name, 
            email,
            phone, 
            photo, 
            role, 
            isVerified, 
            token
        });

    } else{
        res.status(500);
        throw new Error("Something went Wrong Please, Try Again");
    }
  
});

// Send Login Code 
const sendLoginCode = asyncHandler(async(req, res) =>{
    const { email } = req.params;
    const  user = await User.findOne({ email });

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    // find Login Code in data base

    let userToken = await Token.findOne({ 
        userId: user._id,
        expiresAt: {$gt : Date.now()}
    });
  
    if(!userToken){
        res.status(404);
        throw new Error("Invalid or Expired Token, Please login again");
    }

    const  loginCode = userToken.lToken;
    console.log(loginCode);
    const decryptedLoginCode = cryptr.decrypt(loginCode);

     // Send Login Access code 
     const subject = "Login Access Code - NepShop";
     const send_to = email;
     const sent_from = process.env.EMAIL_USER;
     const reply_to = "noreply@nepshop.com";
     const template = "loginCode";
     const name = user.name;
     const link  =  decryptedLoginCode;
 
     try {
         await sendEmail(
            subject, 
            send_to, 
            sent_from, 
            reply_to, 
            template, 
            name, 
            link
            );
         res.status(200).json({message: `Login Access code send to your Email ${email}`});
     } catch (error) {
         res.status(500);
         throw new Error("Email not send. Please! try again");
     }


})


// Login With Access code 
const loginWithCode = asyncHandler(async(req, res)=>{
    const { email} = req.params;
    const { loginCode } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }

    // Find user login token 
    const userToken = await Token.findOne({
        userId: user.id,
        expiresAt: { $gt: Date.now()}
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invaid or Expired Token , please login");      
    }

    const decryptedLoginCode = cryptr.decrypt(userToken.lToken);

    if(loginCode !== decryptedLoginCode){
        res.status(400);
        throw new Error("Incorrect Login Code, Please, Try Again");
    }else{
        
        // Register User Agent
        const ua = parser(req.headers['user-agent']);
        const thisuserAgent = ua.ua;
         user.userAgent.push(thisuserAgent);
         await user.save();

         //Generate Token
        const token = generateToken(user._id);
        
        // send Http-only cookie 
        res.cookie("token", token, {
            path:"/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000*86400), // one day
            sameSite: "none",
            secure: true,
        })

        const { _id, name, email, phone, bio, photo, role, isVerified } = user;
        res.status(200).json({
            _id, 
            name, 
            email,
            phone, 
            bio, 
            photo, 
            role, 
            isVerified, 
            token
        });

    }


});

// logout user
const Logout = asyncHandler ( async (req, res ) => {
    res.cookie("token","",{
        path:"/",
        httpOnly: true,
        expires: new Date(0), 
        sameSite: "none",
        secure:true,
    });
    return res.status(200).json({ message: "Logout sucessfully"})
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



// Update User
const updateUser = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user._id);
    if(user){
     const { name, email,phone, photo, role, isVerified } = user;

     user.name = req.body.name || name,
     user.email = email,
     user.phone = req.body.phone || phone,
     user.address = req.body.address || address,
     user.photo = req.body.photo || photo;
     user.photo = req.body.photo|| photo
     const updatedUser = await user.save();
     
     res.status(200).json({
         _id :updatedUser._id,
         name: updatedUser.name, 
         email:updatedUser.email,
         phone:updatedUser.phone, 
         photo:updatedUser.photo, 
         role:updatedUser.role, 
         address:updatedUser.address,
         isVerified:updatedUser.isVerified, 
     });
        
    }else{
     res.status(404);
     throw new Error("User Not Found");
    }
   
 });

 // Delete User 
const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
   
    if(!user){
        res.status(400);
        throw new Error("User Not found");
    }

    // await user.remove()
    await User.deleteOne({ _id: req.params.id }); // Use deleteOne method to delete the user
    res.status(200).json({
        message: "User deleted successfully"
    });
 
   
});

// getUsers
const getUsers = asyncHandler(async(req,res) =>{
    const users = await User.find().sort("-createdAt");
    if(!users){
        res.status(500);
        throw new Error("Something went Wrong")
    }
    res.status(200).json(users);
});

// Upgrade user
const upgradeUser = asyncHandler(async(req, res) =>{
    const { role, id} = req.body;
    
    const user = await User.findById(id);
    
    if(!user){
        res.status(404);
        throw new Error("User not found")
    }
    user.role = role;
    await user.save();

    res.status(200).json({
        message: `User roled Updated to ${role}`
    })

});

//send send Automated Email
const sendAutomatedEmail = asyncHandler(async(req,res) =>{
   
    const { subject, send_to, reply_to, template, url } = req.body;
  
  
    if(!subject|| !send_to || !reply_to || !template){
        res.status(500);
        throw new Error("missing Email parameter");
    }
    // Get User 
    const user = await User.findOne({email: send_to});

    // if user do exist
    if(!user){
        res.status(404);
        throw new Error("User not Found");
    }

    // if user found
    const sent_from = process.env.EMAIL_USER;
    const name = user.name;
    const link = `${process.env.FRONTEND_URL}${url}`;

    try {
        await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
        res.status(200).json({message: "Email Sent"});
    } catch (error) {
        res.status(500);
        throw new Error("Email not send. Please! try again");
    }

});

// send Verification Email
const sendVerificationEmail = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id);

    //if user doesnot exist
    if(!user){
        res.status(404);
        throw new Error("User does not found please Login or register.");
    }
    // if user is verified 
    if(user.isVerified){
        res.status(400);
        throw new Error("User Already Verified");
    }

    // delete Token if it exists database
    let token =await Token.findOne({ userId: user._id });
    if(token){
        await token.deleteOne()
    }

    //create verification Token and save
    const verificationToken = crypto.randomBytes(32).toString("hex")+ user._id;
  

    // Hash Token and save
    const hashedToken = hashToken(verificationToken);
    await new Token({
        userId : user._id,
        verifyToken: hashedToken,
        createdAt : Date.now(),
        expiresAt : Date.now()+ 60 * (60*1000) // one hour
    }) .save();  
    
    // Construct Verification URL token
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
 

    // Send Email
    const subject = "Verify Your Account - NepShop"
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER
    const reply_to = "noreply@nepshop.com"
    const template = "verifyEmail"
    const name = user.name
    const link  = verificationUrl

    try {
        await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
        res.status(200).json({message: "Verification Email Sent"});
    } catch (error) {
        res.status(500);
        throw new Error("Email not send. Please! try again");
    }

});


// Verify user
const verifyUser = asyncHandler(async(req, res ) =>{
    const { verificationToken } = req.params;
  
    const hashedToken = hashToken(verificationToken);
    const userToken = await Token.findOne({
        verifyToken: hashedToken, 
        expiresAt: {$gt: Date.now()}
    });
   

    // if there is no token that matched in datbase
    if(!userToken){
        res.status(404);
        throw new Error("Invalid or Expired Token ");
    }

    // Find User
    const user = await User.findOne({_id: userToken.userId});

    if(user.isVerified){
        res.status(400);
        throw new Error("User is already verified ");
    }

    // Verify User Now
    user.isVerified = true;
    await user.save();
    res.status(200).json({message: "Account Verification Sucessful"});

});

// Forgot Password
const forgotPassword = asyncHandler(async(req, res)=>{
    const {email} = req.body
    const user = await User.findOne({email})

    if(!user){
        res.status(404);
        throw new Error("User Not Found with this Email");
    }

    // delete Token if it exists database
    let token =await Token.findOne({ userId: user._id });
    if(token){
        await token.deleteOne()
    }

    //create Reset Token and save
    const resetToken = crypto.randomBytes(32).toString("hex")+ user._id;


    // Hash Token and save
    const hashedToken = hashToken(resetToken);
    await new Token({
        userId : user._id,
        resToken: hashedToken,
        createdAt : Date.now(),
        expiresAt : Date.now()+ 60 * (60*1000) // one hour
    }) .save();  
    
    // Construct Reset URL token
    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
 

    // Send Email
    const subject = "Password Reset Request - NepShop";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@nepshop.com";
    const template = "forgotPassword";
    const name = user.name;
    const link  =  resetUrl;

    try {
        await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
        res.status(200).json({message: "Reset Password Email Sent"});
    } catch (error) {
        res.status(500);
        throw new Error("Email not send. Please! try again");
    }

});

// Reset Password 
const resetPassword = asyncHandler(async(req, res) => {
    const {resetToken} = req.params;
    const {password} = req.body;

    const hashedToken = hashToken(resetToken);

    const userToken = await Token.findOne({
        resToken: hashedToken, 
        expiresAt: {$gt: Date.now()},
    });
   

    // if there is no token that matched in datbase
    if(!userToken){
        res.status(404);
        throw new Error("Invalid or Expired Token ");
    }

    // Find User
    const user = await User.findOne({_id: userToken.userId});


    // Reset User Password 
    user.password = password;
    await user.save();
    res.status(200).json({message: "Password Reset Sucessful. Please, Login"});

});

// change Password
const changePassword = asyncHandler(async(req,res)=>{
    const { oldPassword, password} = req.body;
    const user = await User.findById(req.user._id).select("+password");

    // if user doesnot found
    if(!user){
        res.status(404);
        throw new Error(" User not found");
    }

    if(!oldPassword || !password){
        res.status(400);
        throw new Error("Please Enter Old and New Password");
    }
   
    
    // check if old password is correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // if the password is correct reset the password to new password
    if(user && passwordIsCorrect){
        user.password = password;
        await user.save();

        res.status(200).json({message: "Password is Changed Sucessfully, Please Relogin "});
    }else{
        res.status(400);
        throw new Error("Old Password is Incorrect");
    }

});

module.exports = {
    registerUser,
    loginUser,
    Logout,
    getUser,
    getLoginStatus,
    updateUser,
    deleteUser,
    getUsers,
    upgradeUser,
    sendAutomatedEmail,
    sendVerificationEmail,
    verifyUser,
    forgotPassword,
    resetPassword,
    changePassword,
    sendLoginCode,
    loginWithCode,

  
};