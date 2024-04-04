// https request code 
import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export const API_URL = `${BACKEND_URL}/api/v1/user/`;

// Register User 

const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData,{
        withCredentials: true,
    }) 
    return response.data
};

// Login User 
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    return response.data;
};

// Logout User 
const logout = async () => {
    const response = await axios.get(API_URL + "logout");
    return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus");
    return response.data;
};

// Get User
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser");
    return response.data;
};

// Update user Profile
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData);
    return response.data;
};


// send Verification email
const sendVerificationEmail= async() =>{
    const response = await axios.post(API_URL + "sendVerificationEmail");
    return response.data.message;
};


// Verify User
const verifyUser= async(verificationToken) =>{
    const response = await axios.patch(`${API_URL}verifyUser/${verificationToken}`);
    return response.data.message;
};
//  change Password
const changePassword= async(userData) =>{
    const response = await axios.patch(API_URL +"changePassword", userData);
    return response.data.message;
};

//  forgot Password
const forgotPassword= async(userData) =>{
    const response = await axios.post(API_URL +"forgotPassword", userData);
    return response.data.message;
};

//  Reset Password
const resetPassword= async(userData, resetToken) =>{
    const response = await axios.patch(`${API_URL}resetPassword/${resetToken}`,userData);
    return response.data.message;
};

//  Get Users
const getUsers= async() =>{
    const response = await axios.get(API_URL +"getUsers");
    return response.data;
};

// Delete User
const deleteUser = async(id) =>{
    const response = await axios.delete(API_URL +id);
    return response.data.message;
};

// Upgrade user
const upgradeUser = async(userData) =>{
    const response = await axios.post(API_URL +"upgradeUser", userData);
    return response.data.message;
};
// Send Login Code 
const sendLoginCode = async(email) =>{
    const response = await axios.post(API_URL +`sendLoginCode/${email}`);
    return response.data.message;
};
// Send Login Code 
const loginWithCode = async(code, email) =>{
    const response = await axios.post(API_URL +`loginWithCode/${email}`,code);
    return response.data;
};



// Update user Profile photo
const updatePhoto = async (userData) => {
    const response = await axios.patch(API_URL + "updatePhoto", userData);
    return response.data;
};


const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    sendVerificationEmail,
    verifyUser,
    changePassword,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    upgradeUser,
    sendLoginCode,
    loginWithCode,
    updatePhoto,
};
export default authService;