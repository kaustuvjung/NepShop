// https request code 
import axios from "axios";

// const BACKEND_URL = "http://localhost:8000"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

console.log("Backend URL:", BACKEND_URL);
console.log( import.meta.env.VITE_FRONTEND_URL);


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

const authService = {
    register,
    login,
    logout,
};
export default authService;