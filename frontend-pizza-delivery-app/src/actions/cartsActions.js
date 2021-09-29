import {ADD_TO_CART, DELETE_FROM_CART} from "./util/types";

const addToCart = (pizza, varient, quantity) => (dispatch, getState) => {

    const cartItem = {
        name: pizza.name,
        id: pizza.id,
        image: pizza.image,
        varient: varient,
        quantity: Number(quantity),
        prices: pizza.prices,
        price: pizza.prices[0][varient] * quantity
    }

    if (cartItem.quantity > 10) {
        alert('You can not add more then 10 quantities')
    } else if (cartItem.quantity < 1) {
        alert('You can not add less then 0 quantities')
    } else {
        dispatch({
            type: ADD_TO_CART,
            payload: cartItem
        })
    }
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

const deleteFromCart = (pizza) => (dispatch, getState) => {

    dispatch({
        type: DELETE_FROM_CART,
        payload: pizza
    })

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}


export {addToCart, deleteFromCart}
