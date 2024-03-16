const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register User 
const registerUser = asyncHandler (async (req, res) => {
    res.send("Register User....!!");
});

module.exports = {
    registerUser,
};