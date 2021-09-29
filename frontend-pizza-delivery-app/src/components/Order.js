import React from 'react';

function Order({order}) {
    return (
        <div className='flex-container' style={{backgroundColor: 'red', color: 'white'}}>

            <div className='text-sm-start w-100 m-1'>
                <h2 style={{fontSize:'25px'}} className='text-sm-center'>Items:</h2>
                <hr/>
                {order.orderItems.map(item=>{
                    return <div>
                        <h1>{item.name} [{item.varient}] * {item.quantity} = {item.price}</h1>
                    </div>
                })}
            </div>

            <div className='text-sm-start w-100 m-1'>
                <h2 style={{fontSize:'25px'}} className='text-sm-center'>Address:</h2>
                <hr/>
                <h1>Street: {order.shippingAddress.address}</h1>
                <h1>City: {order.shippingAddress.city}</h1>
                <h1>Country: {order.shippingAddress.country}</h1>
                <h1>Zip Code: {order.shippingAddress.zip}</h1>
            </div>

            <div className='text-sm-start w-100 m-1'>
                <h2 style={{fontSize:'25px'}} className='text-sm-center'>Order Info:</h2>
                <hr/>
                <h1>Order Amount: {order.orderAmount}</h1>
                <h1>Date: {order.date.substring(0,10)}</h1>
                <h1>Transaction Id: {order.transactionId}</h1>
                <h1>Order Id: {order.id}</h1>
            </div>

        </div>
    );
}

export default Order;
