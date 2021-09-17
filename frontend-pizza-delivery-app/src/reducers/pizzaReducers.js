import {GET_PIZZAS_FAILED, GET_PIZZAS_REQUEST, GET_PIZZAS_SUCCESS} from "../actions/types";
import {useSelector} from "react-redux";

const initialState = {
    pizzas:  [],
    pizza: {},
    loading: false
}

const getAllPizzasReducer = (state=initialState, action) => {

    switch (action.type) {

        case GET_PIZZAS_REQUEST: return {
            loading: true,
            ...state,
        }

        case GET_PIZZAS_SUCCESS: return {
            loading: false,
            pizzas: action.payload
        }

        case GET_PIZZAS_FAILED: return {
            loading: false,
            error: action.payload
        }

        default: return state

    }
}

export {getAllPizzasReducer}
