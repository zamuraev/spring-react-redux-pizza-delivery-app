import {
    ADD_PIZZA_REQUEST,
    ADD_PIZZAS_FAILED,
    ADD_PIZZAS_SUCCESS, DELETE_PIZZA_FAILED, DELETE_PIZZA_REQUEST, DELETE_PIZZA_SUCCESS, EDIT_PIZZA_FAILED,
    EDIT_PIZZA_REQUEST,
    EDIT_PIZZA_SUCCESS,
    GET_PIZZABYID_FAILED,
    GET_PIZZABYID_REQUEST,
    GET_PIZZABYID_SUCCESS,
    GET_PIZZAS_FAILED,
    GET_PIZZAS_REQUEST,
    GET_PIZZAS_SUCCESS
} from "../actions/util/types";

const initialState = {
    pizzas:  [],
    pizza: {}
}

const getAllPizzasReducer = (state=initialState, action) => {

    switch (action.type) {

        case GET_PIZZAS_REQUEST: return {
            loading: true,
            ...state
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

const addPizzaReducer = (state=initialState, action) => {

    switch (action.type) {

        case ADD_PIZZA_REQUEST: return {
            loading: true,
            ...state
        }

        case ADD_PIZZAS_SUCCESS: return {
            loading: false,
            success: true
        }

        case ADD_PIZZAS_FAILED: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

const getPizzaByIdReducer = (state=initialState, action) => {

    switch (action.type) {

        case GET_PIZZABYID_REQUEST: return {
            loading: true,
            ...state
        }

        case GET_PIZZABYID_SUCCESS: return {
            loading: false,
            pizza: action.payload
        }

        case GET_PIZZABYID_FAILED: return {
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

const editPizzaReducer = (state=initialState, action) => {

    switch (action.type) {

        case EDIT_PIZZA_REQUEST: return {
            editLoading: true,
            ...state
        }

        case EDIT_PIZZA_SUCCESS: return {
            editLoading: false,
            editSuccess: true
        }

        case EDIT_PIZZA_FAILED: return {
            editLoading: false,
            editError: action.payload
        }

        default: return state
    }
}

const deletePizzaReducer = (state=initialState, action) => {

    switch (action.type) {

        case DELETE_PIZZA_REQUEST: return {
            deleteLoading: true,
            ...state
        }

        case DELETE_PIZZA_SUCCESS: return {
            deleteLoading: false,
            deleteSuccess: true,
            pizzas: state.pizzas.filter(pizza=> pizza.id !== action.payload)

        }

        case DELETE_PIZZA_FAILED: return {
            deleteLoading: false,
            deleteError: action.payload
        }

        default: return state
    }
}

export {getAllPizzasReducer, addPizzaReducer, getPizzaByIdReducer, editPizzaReducer, deletePizzaReducer}
