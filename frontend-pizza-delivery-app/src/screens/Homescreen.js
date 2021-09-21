import React, {useEffect} from 'react';
import Pizza from "../components/Pizza";
import {useDispatch, useSelector} from "react-redux";
import {getAllPizzas} from '../actions/pizzaAct'
import Load from "../components/Load";

function Homescreen(props) {

    const dispatch = useDispatch()
    const pizzaState = useSelector((state) => state.getAllPizzasReducer)
    const { token } = useSelector((state) => state.getLogInUser)

    const {pizzas, error, loading} = pizzaState

    useEffect(
       () => {

           dispatch(getAllPizzas());

       } , []
   )

    return (

        <div>
            <div className="row justify-content-center">

                {loading ? (<div><Load /></div>) : error ? (<h1>Something went wrong...</h1>) : (

                    pizzas.map(pizza => {
                            return <div className="col-md-4 p-3" key={pizza.id}>
                                <div className='m-3'>
                                    <Pizza pizza={pizza}/>
                                </div>
                            </div>
                        })
                )}

            </div>
        </div>
    );


}

export default Homescreen;
