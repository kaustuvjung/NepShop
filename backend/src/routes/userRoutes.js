const express = require("express");
const { registerUser, loginUser, Logout, getUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout" , Logout);
router.get("/getUser" ,protect, getUser);

module.exports = router;