const express = require("express");
const { registerUser, loginUser, Logout } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout" , Logout);

module.exports = router;