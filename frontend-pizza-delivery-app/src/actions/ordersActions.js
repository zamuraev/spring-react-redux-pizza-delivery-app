import fetchClient from './util/fetchClient'
import {
    GET_ALL_ORDERS_FAILED,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ORDERS_FAILED,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    PLACE_ORDER_FAILED,
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS
} from "./util/types";

const placeOrder = (token, subtotal) => async (dispatch, getState) => {

    dispatch({type: PLACE_ORDER_REQUEST})

    const currentUser = getState().loginUserReducer.currentUser
    const cartItems = getState().cartReducer.cartItems

    const address = {
        country: token.card.address_country,
        city: token.card.address_city,
        address: token.card.address_line1,
        zip: token.card.address_zip
    }

    const order = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        userId: currentUser.userId,
        orderItems: cartItems,
        shippingAddress: address,
        orderAmount: subtotal,
        transactionId: token.card.id,
    }

    try {
        await fetchClient.post("/placeorder", order, {
            headers: {
                token: token.id,
                amount: subtotal,
            },
        })

        dispatch({type: PLACE_ORDER_SUCCESS})
        localStorage.removeItem("cartItems");
        window.location.reload();

    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAILED,
            payload: error.response.data
        });
    }
}

const getAllOrdersByUserId = () => async (dispatch, getState) => {

    dispatch({type: GET_ORDERS_REQUEST})

    const currentUser = getState().loginUserReducer.currentUser

    try {
        const response = await fetchClient.get(`/orders/users/${currentUser.userId}`)
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_ORDERS_FAILED,
            payload: error.response.data
        })
    }
}

const getAllOrders = () => async dispatch => {

    dispatch({type: GET_ALL_ORDERS_REQUEST})

    try {
        const response = await fetchClient.get("/orders")
        dispatch({
            type: GET_ALL_ORDERS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_ALL_ORDERS_FAILED,
            payload: error.response.data
        })
    }
}

const deliverOrder = (orderId) => async dispatch => {
    try {
        await fetchClient.get(`/orders/${orderId}/deliver`)
        window.location.reload();
    } catch (error) {
        dispatch({
            type: GET_ALL_ORDERS_FAILED,
            payload: error.response.data
        })
    }
}


export {placeOrder, getAllOrdersByUserId, getAllOrders, deliverOrder}
