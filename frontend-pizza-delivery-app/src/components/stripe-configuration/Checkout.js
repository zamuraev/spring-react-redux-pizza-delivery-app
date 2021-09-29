import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {useDispatch} from "react-redux";
import {placeOrder} from "../../actions/ordersActions"

function Checkout({subtotal}) {

    const dispatch = useDispatch()

    function tokenHandler(token)
    {
        console.log(token)
        dispatch(placeOrder(token,subtotal))
    }

    return (
     <StripeCheckout
         stripeKey='pk_test_51JZNVuGG6p8L1ZBYweieXOPaHu1HxN9vLRgNyxdBPN5oqXN97mXvO9vU1ccUvZBh6IW4iRTwSCyjBcymIBuwMPz8001lw82ddT'
         amount={subtotal*100}
         shippingAddress
         token={tokenHandler}
         currency='UAH'
     >
         <button className='btn'>Pay Now</button>
     </StripeCheckout>
    )
}

export default Checkout
