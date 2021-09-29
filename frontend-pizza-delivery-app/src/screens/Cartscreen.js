import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, deleteFromCart} from "../actions/cartsActions";
import Checkout from "../components/stripe-configuration/Checkout";
import Success from "../components/util/Success";
import Error from "../components/util/Error";

function Cartscreen(props) {

    const {cartItems } = useSelector((state) => state.cartReducer)
    const {success,error} = useSelector((state) => state.placeOrderReducer)
    const dispatch = useDispatch();
    var subtotal = cartItems.reduce((x, item) => (x + item.price), 0)

    return (
        <div className='row justify-content-center'>

            <div className=' text-right col-md-7'>
                <h2 className="p-1" style={{fontSize: '45px', display: 'inline'}}>Pizzas</h2>
                <i className="bi bi-cart-plus" />

                {cartItems.map(item => {
                    return <div className="flex-container" key={item.id}>
                        <div className="m-1 w-50 text-sm-start">
                            <h1>{item.name} [{item.varient}]</h1>
                            <h1>Price: {item.quantity} * {item.prices[0][item.varient]} = {item.price} UAH </h1>
                            <h1 style={{display: 'inline'}}>Quntity:</h1>
                            <i className="bi bi-dash-lg m-1" aria-hidden="true"
                               onClick={() => dispatch(addToCart(item, item.varient, item.quantity - 1))}/>
                            <b>{item.quantity}</b>
                            <i className="bi bi-plus-lg m-1" aria-hidden="true"
                               onClick={() => dispatch(addToCart(item, item.varient, item.quantity + 1))}/>
                            <hr/>
                        </div>
                        <div className="m-1 w-25 mb-3">
                            <img src={item.image} style={{height: '110px', width: '110px'}}/>
                        </div>
                        <div className="border-right m-1 mt-4 w-35">
                            <i className="bi bi-archive-fill" onClick={() => dispatch(deleteFromCart(item))}/>
                        </div>
                    </div>
                })}

            </div>

            <div className="col-md-4 text-sm-end">
                <h2 style={{fontSize: '45px'}}>Subtotal: {subtotal} UAH</h2>
                <Checkout subtotal={subtotal}/>
                <div className='mt-3'>
                    {success && (<Success success={'Order Placed Successfully'}/>)}
                    {error && (<Error error={'Payment failed'}/>)}
                </div>
            </div>
        </div>
    )
}

export default Cartscreen
