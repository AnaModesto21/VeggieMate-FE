import axios from 'axios'

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL

} from '../../../constants/productConstants'

export const getProducts = ( keyword = '', currentPage = 1 ) => async (dispatch) => {
    try{

        dispatch ({ type: ALL_PRODUCTS_REQUEST})

        // let link = `products?keyword=${keyword}&page=${currentPage}}`

        const { data } = await axios.get(`products?keyword=${keyword}&page=${currentPage}`)

        dispatch ({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch ({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const getProductDetails = (id) => async (dispatch) => {
    try{

        dispatch ({ type: PRODUCT_DETAILS_REQUEST})
        console.log(id)
        const {data } = await axios.get(`products/${id}`)
        console.log(id)

        dispatch ({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch ({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}