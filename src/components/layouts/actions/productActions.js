import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../../../constants/productConstants'

const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;


export const getProducts = ( keyword = '', currentPage = 1 ) => async (dispatch) => {
    try{

        dispatch ({ type: ALL_PRODUCTS_REQUEST})

        // let link = `products?keyword=${keyword}&page=${currentPage}}`

        const { data } = await axios.get(`${baseURL}?page=${currentPage}`)


        dispatch ({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        console.log('data.message :>> ', data.message)
    } catch (error) {
        dispatch ({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        // const data ={};
        const { data } = await axios.get(`${baseURL}product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`${baseURL}review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`${baseURL}reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`${baseURL}reviews?id=${id}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
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