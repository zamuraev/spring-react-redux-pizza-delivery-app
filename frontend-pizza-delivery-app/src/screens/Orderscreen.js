import React, {useEffect} from 'react';
import {useDispatch, useSelector,} from "react-redux";
import {getAllOrdersByUserId} from "../actions/ordersActions";
import Load from "../components/util/Load";
import Order from "../components/Order";
import Error from "../components/util/Error";

function Orderscreen() {

    const dispatch = useDispatch();
    const {orders, loading, error} = useSelector((state) => state.getAllOrdersByUserId)

    useEffect(
        () => {
            dispatch(getAllOrdersByUserId());
        }, []
    )

    return (
        <div>
            <h2 style={{fontSize: '35px', display: 'inline'}}>My Orders</h2>
            <i className="bi bi-patch-check"/>
            <hr/>
            <div className="row justify-content-center">
                {loading && (<Load />)}
                {error && (<Error error={'Orders Load Went Wrong'}/>)}
                {orders && (orders.map(order => {
                    return <div className="col-md-8 m-1" key={order.id}>
                        <div className='m-3'>
                            <Order order={order}/>
                        </div>
                    </div>
                }))}
            </div>
        </div>
    )
}

export default Orderscreen
