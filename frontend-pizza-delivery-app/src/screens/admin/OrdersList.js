import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Load from "../../components/util/Load";
import Error from "../../components/util/Error";
import {deliverOrder, getAllOrders} from "../../actions/ordersActions";

function OrdersList(props) {

    const dispatch = useDispatch()
    const {orders, error, loading} = useSelector((state) => state.getAllOrdersReducer)

    useEffect(
        () => {

            dispatch(getAllOrders());
        }, []
    )

    return (
        <div>
            <h2>Orders List</h2>

            {loading ? (<Load/>) : error ? (<Error error={'Something went wrong'}/>) : (
                <table className="table table-bordered">
                    <thead className='table-dark'>
                    <tr className="text-sm-center">
                        <th scope="col">Order Id</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Id</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders && orders.map(order => {
                        return <tr key={order.id}>
                            <th scope='row' style={{width: "100px"}}>{order.id}</th>
                            <td>{order.email}</td>
                            <td>{order.userId}</td>
                            <td>{order.orderAmount} UAH</td>
                            <td>{order.date.substring(0,10)}</td>
                            <td className='text-sm-center'>
                                {order.isDelivered ? <span style={{color: 'green'}}>Delivered</span> :
                                    <button style={{height: "35px"}} className='btn'
                                            onClick={deliverOrder(order.id)}>Deliver</button>}
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrdersList;
