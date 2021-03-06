import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../../../constants/cartConstants";

const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${baseURL}product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
    payload: [],
  });
  console.log(
    'localStorage.getItem("cartItems"',
    localStorage.getItem("cartItems")
  );
  localStorage.setItem("cartItems", []);
  console.log(
    'localStorage.getItem("cartItems"',
    localStorage.getItem("cartItems")
  );
};
