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
} from "./util/types";
import fetchClient from './util/fetchClient'

const getAllPizzas = () => async dispatch => {

    dispatch({type: GET_PIZZAS_REQUEST})

    try {
        const response = await fetchClient.get('/pizzas')

        dispatch({
            type: GET_PIZZAS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: GET_PIZZAS_FAILED,
            payload: error.response.data
        })
    }
}


const filterPizzas = (searchkey, category) => async dispatch => {

    var filteredPizzas;

    dispatch({type: GET_PIZZAS_REQUEST})

    try {
        const response = await fetchClient.get('/pizzas')
        filteredPizzas = response.data.filter(pizza => pizza.name.toLowerCase().includes(searchkey))

        if(category!=='all') {
            filteredPizzas = filteredPizzas.filter(pizza => pizza.category.toLowerCase()===category)
        }

        dispatch({
            type: GET_PIZZAS_SUCCESS,
            payload: filteredPizzas
        })

    } catch (error) {
        dispatch({
            type: GET_PIZZAS_FAILED,
            payload: error.response.data
        })
    }
}

const addPizza = (pizza) => async dispatch => {

    dispatch({type: ADD_PIZZA_REQUEST})

    try {
        const response = await fetchClient.post('/pizzas', pizza)

        dispatch({
            type: ADD_PIZZAS_SUCCESS,
        })
        window.location.href="/admin/pizzaslist"

    } catch (error) {
        {
            dispatch({
                type: ADD_PIZZAS_FAILED,
                payload: error.response.data
            })
        }
    }
}

const getPizzaById = (pizzaId) => async dispatch => {

    dispatch({type: GET_PIZZABYID_REQUEST})

    try {
        const response = await fetchClient.get(`/pizzas/${pizzaId}`)

        dispatch({
            type: GET_PIZZABYID_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_PIZZABYID_FAILED,
            payload: error.response.data
        })
    }
}

const editPizza = (pizzaId, pizza) => async dispatch => {

    dispatch({type: EDIT_PIZZA_REQUEST})

    try {
        const response = await fetchClient.put(`/pizzas/${pizzaId}`, pizza)

        dispatch({
            type: EDIT_PIZZA_SUCCESS,
        })

        window.location.href="/admin/pizzaslist"

    } catch (error) {
        {
            dispatch({
                type: EDIT_PIZZA_FAILED,
                payload: error.response.data
            })
        }
    }
}

const deletePizza = (pizzaId) => async dispatch => {

    dispatch({type: DELETE_PIZZA_REQUEST})
    try {

        const response = await fetchClient.delete(`/pizzas/${pizzaId}`)

        dispatch({
            type: DELETE_PIZZA_SUCCESS,
            payload: pizzaId
        })
        window.location.reload();

    } catch (error) {
        dispatch({
            type: DELETE_PIZZA_FAILED,
            payload: error.response.data
        })
    }
}

export {getAllPizzas, filterPizzas, addPizza, getPizzaById, editPizza, deletePizza}
