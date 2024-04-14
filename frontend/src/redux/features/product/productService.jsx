import axios from "axios";
 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/v1/product/`;

console.log(API_URL);

// create New Product = async 