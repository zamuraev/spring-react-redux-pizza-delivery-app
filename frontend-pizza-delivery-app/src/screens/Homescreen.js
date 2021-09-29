import React, {useEffect} from 'react';
import Pizza from "../components/Pizza";
import {useDispatch, useSelector} from "react-redux";
import {getAllPizzas} from '../actions/pizzasActions'
import Load from "../components/util/Load";
import Filter from "../components/Filter";
import Error from "../components/util/Error";

function Homescreen(props) {

    const dispatch = useDispatch()
    const pizzaState = useSelector((state) => state.getAllPizzasReducer)

    const {pizzas, error, loading} = pizzaState

    useEffect(
       () => {

           dispatch(getAllPizzas());
       } , []
   )

    return (

        <div>
            <div className="row justify-content-center">

                <Filter/>
                {loading ? (<Load/>) : error ? (<Error error={'Something went wrong'}/>) : (

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
