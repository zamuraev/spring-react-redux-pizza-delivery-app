import { combineReducers} from 'redux'
import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {
    addPizzaReducer,
    deletePizzaReducer,
    editPizzaReducer,
    getAllPizzasReducer,
    getPizzaByIdReducer
} from "../reducers/pizzaReducers";
import {deleteUserReducer, getAllUsersReducer, loginUserReducer, registerUserReducer} from "../reducers/userReducers";
import {cartReducers} from "../reducers/cartReducers";
import {getAllOrdersByUserId, getAllOrdersReducer, placeOrderReducer} from "../reducers/orderReducers";

const finalReducer =  combineReducers({

    loginUserReducer: loginUserReducer,
    registerUserReducer: registerUserReducer,
    getAllPizzasReducer: getAllPizzasReducer,
    addPizzaReducer: addPizzaReducer,
    getPizzaByIdReducer: getPizzaByIdReducer,
    editPizzaReducer: editPizzaReducer,
    deletePizzaReducer: deletePizzaReducer,
    cartReducer: cartReducers,
    placeOrderReducer: placeOrderReducer,
    getAllOrdersByUserId: getAllOrdersByUserId,
    getAllOrdersReducer: getAllOrdersReducer,
    getAllUsersReducer: getAllUsersReducer,
    deleteUserReducer: deleteUserReducer
})

const cartItems = window.localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser = window.localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
const jwtToken = window.localStorage.getItem('jwtToken') ? window.localStorage.getItem('jwtToken') : null

const initialState = {

    cartReducer: {
        cartItems: cartItems
    },

    loginUserReducer: {
        token: jwtToken,
        currentUser: currentUser
    }
}

const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer,initialState,composeEnhancers(applyMiddleware(thunk)))
export default store
