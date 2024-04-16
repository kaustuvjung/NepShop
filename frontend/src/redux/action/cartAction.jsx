import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../../constants/cartConstant";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/v1/product/`;


// add to cart
export const addItemsToCart = (id, quantity) => async(dispatch, getState) =>{
    console.log("Received id:", id);
  console.log("Received quantity:", quantity);
    try {
        const { data } = await axios.get(`${API_URL}product/${id}`);
        
        console.log("Received data from server:", data); // Log received data
        
        dispatch({
          type: ADD_TO_CART,
          payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image?.filepath,
            stock: data.product.Stock,
            quantity,
          },
        });
    
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
      } catch (error) {
        console.error("Error adding item to cart:", error);
        console.log("not acces ");
      }
};

// remove from cart
export const removeItemsFromCart = (id) => async(dispatch, getState) =>{
    const { data } = await axios.get(`${API_URL}product/${id}`);

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,              
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

   
};


// Save Shipping Info
export const saveShippingInfo= (data) => async(dispatch) =>{

  dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,              
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));

 
};
