import { combineReducers} from 'redux'
import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {getAllPizzasReducer} from "./reducers/pizzaReducers";
import {getLogInUser} from "./reducers/authReducers";
import {getUserError} from "./reducers/errorReducer";


const finalReducer =  combineReducers({

    getAllPizzasReducer: getAllPizzasReducer,
    getLogInUser: getLogInUser,
    getUserError: getUserError

})

const initialState = {}

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer,initialState,composeEnhancers(applyMiddleware(thunk)))

export default store
