import {
    GET_ALL_ORDERS_FAILED,
    GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS,
    GET_ORDERS_FAILED,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    PLACE_ORDER_FAILED,
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS
} from "../actions/util/types";

const initialState = {
    order: {},
    orders: [],
    loading: false
}

const placeOrderReducer = (state = {initialState}, action) => {

    switch (action.type) {

        case (PLACE_ORDER_REQUEST):
            return {
               loading: true
            }

        case (PLACE_ORDER_SUCCESS):
            return {
                loading: false,
                success: true
            }

        case (PLACE_ORDER_FAILED):
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

const getAllOrdersByUserId = (state = {initialState}, action) => {
    switch (action.type) {
        case (GET_ORDERS_REQUEST):
            return {
                loading: true,
                ...state
            }

        case (GET_ORDERS_SUCCESS):
            return {
                loading: false,
                orders: action.payload
            }

        case (GET_ORDERS_FAILED):
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const getAllOrdersReducer = (state = {initialState}, action) => {
    switch (action.type) {
        case (GET_ALL_ORDERS_REQUEST):
            return {
                loading: true,
                ...state
            }

        case (GET_ALL_ORDERS_SUCCESS):
            return {
                loading: false,
                orders: action.payload
            }

        case (GET_ALL_ORDERS_FAILED):
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export {placeOrderReducer, getAllOrdersByUserId, getAllOrdersReducer}
