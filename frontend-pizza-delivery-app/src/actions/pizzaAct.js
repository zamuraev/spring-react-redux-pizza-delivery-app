import {GET_PIZZAS_FAILED, GET_PIZZAS_REQUEST, GET_PIZZAS_SUCCESS} from "./types";
import fetchClient from './fetchClient'

const getAllPizzas = () => async dispatch => {

    dispatch({type: GET_PIZZAS_REQUEST})

    try {
        const response = await fetchClient.get('/pizzas')

        console.log(response.data);
        dispatch({
            type: GET_PIZZAS_SUCCESS,
            payload: response.data
        })

    } catch(error) {
        dispatch({
            type: GET_PIZZAS_FAILED,
            payload: error
        })
    }
}


export {getAllPizzas}
