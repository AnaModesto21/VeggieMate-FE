import axios from 'axios'
import { clearCart } from './cartActions';
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    // ALL_ORDERS_REQUEST,
    // ALL_ORDERS_SUCCESS,
    // ALL_ORDERS_FAIL,
    // UPDATE_ORDER_SUCCESS,
    // UPDATE_ORDER_REQUEST,
    // UPDATE_ORDER_FAIL,
    // DELETE_ORDER_REQUEST,
    // DELETE_ORDER_SUCCESS,
    // DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../../../constants/orderConstants'

const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;

export const createOrder = (order) => async (dispatch, getState) => {
    
    try {
        
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        const { data } = await axios.post(`${baseURL}order/order/new`, order, config)

        console.log(
            'localStorage.getItem("cartItems"',
            localStorage.getItem("cartItems")
          );
          localStorage.setItem("cartItems", []);
          console.log(
            'localStorage.getItem("cartItems"',
            localStorage.getItem("cartItems")
          );

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
            
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        const { data } = await axios.get(`${baseURL}order/orders/me`, config)

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        const { data } = await axios.get(`${baseURL}order/order/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}