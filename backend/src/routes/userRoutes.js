const express = require("express");
const { 
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
    loginWithCode} = require("../controllers/userController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout" , Logout);
router.get("/getUser" ,protect, getUser);
router.get("/getLoginStatus" ,getLoginStatus);

router.patch("/updateUser" ,protect, updateUser);
router.delete("/:id",protect,adminOnly, deleteUser)
router.get("/getUsers",protect,adminOnly, getUsers);
router.post("/upgradeUser",protect,adminOnly, upgradeUser);
router.post("/sendAutomatedEmail",protect,sendAutomatedEmail);


router.post("/sendVerificationEmail",protect,sendVerificationEmail);
router.patch("/verifyUser/:verificationToken", verifyUser);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/changePassword",protect,changePassword);

router.post("/sendLoginCode/:email",sendLoginCode);
router.post("/loginWithCode/:email",loginWithCode);
// router.post("/google/callback",loginWithGoogle);



module.exports = router;