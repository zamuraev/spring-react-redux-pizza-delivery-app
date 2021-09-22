import fetchClient from './fetchClient'

const placeOrder = (token, subtotal) => async (dispatch, getState) => {

    dispatch({type: 'PLACE_ORDER_REQUEST'})

    // const currentUser = getState().getLogInUser.currentUser
    // const cartItems = getState.cartReducer.cartItems
    //
    // try {
    //     const response = await fetchClient.post("/placeorder", {token, subtotal, currentUser, cartItems})
    //     dispatch({type: 'PLACE_ORDER_SUCCESS'})
    //     console.log(response);
    //
    // } catch(error) {
    //     dispatch({type: 'PLACE_ORDER_FAILED'})
    //     console.log(error);
    // }
    //}

    await fetchClient.post("/placeorder", "", {
        headers: {
            token: token.id,
            amount: subtotal,
        },}).then(() => {

    }).catch((error) => {
        alert(error);
    })

}

export {placeOrder}
