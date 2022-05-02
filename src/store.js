import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //interact with a Redux store's dispatch and getState methods.
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer } from './reducers/productsReducer'


const reducer = combineReducers({
    products: productsReducer
})

//put cart items on array after update
let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;