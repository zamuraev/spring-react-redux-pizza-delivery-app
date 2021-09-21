import { combineReducers} from 'redux'
import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {getAllPizzasReducer} from "./reducers/pizzaReducers";
import {getLogInUser} from "./reducers/authReducers";
import {getUserError} from "./reducers/errorReducer";
import {cartReducer} from "./reducers/cartReducer";
import {placeOrderReducer} from "./reducers/orderReducer";

const finalReducer =  combineReducers({

    getAllPizzasReducer: getAllPizzasReducer,
    getLogInUser: getLogInUser,
    getUserError: getUserError,
    cartReducer: cartReducer,
    placeOrderReducer: placeOrderReducer
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {

    cartReducer: {
        cartItems: cartItems
    }
}

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer,initialState,composeEnhancers(applyMiddleware(thunk)))

export default store
