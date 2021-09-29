import React, {useState} from 'react';
import {Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../actions/cartsActions";

export default function Pizza({pizza}) {

    const [varient, setVarient] = useState('small');
    const [quantity, setQuantity] = useState(1);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const insertInCart = () => {
        dispatch(addToCart(pizza, varient, quantity))
    }

    return (
        <div className='shadow-lg p-1 mb-5 bg-white rounded'>

            <div onClick={handleShow}>
                <h1>{pizza.name}</h1>
                <img src={pizza.image} className="img-fluid" style={{height: '250px', width: '250px'}}/>
            </div>

            <div className="flex-container">

                <div className='w-100 m-1'>
                    <p>Varients:</p>
                    <select className='form-control' value={varient} onChange={(e) => {
                        setVarient(e.target.value)
                    }}>
                        {pizza.varients.map(varient => {
                            return <option value={varient}>{varient}</option>
                        })}
                    </select>
                </div>

                <div className='w-100 m-1'>
                    <p>Quantity:</p>
                    <select className='form-control' value={quantity} onChange={(e) => {
                        setQuantity(e.target.value)
                    }}>
                        {[...Array(10).keys()].map((x, i) => {
                            return <option value={i + 1} key={i}>
                                {i + 1}
                            </option>
                        })}
                    </select>
                </div>
            </div>

            <div className="flex-container">
                <div className='m-1 w-100'>
                    <h1 className='mt-3'>Price: {pizza.prices[0][varient] * quantity} UAH</h1>
                </div>

                <div className='m-1 w-100'>
                    <button className="btn mt-2" onClick={insertInCart}>ADD TO CART</button>
                </div>

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={pizza.image} className="rounded mx-auto d-block" style={{height: '300px', width: '300px'}}/>
                    <p className='m-2'>{pizza.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn' onClick={handleClose}>CLOSE</button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}


