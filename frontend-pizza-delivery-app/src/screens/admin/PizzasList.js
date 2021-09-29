import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPizzas, deletePizza} from "../../actions/pizzasActions";
import Load from "../../components/util/Load";
import Error from "../../components/util/Error";
import {Link} from "react-router-dom";
import Success from "../../components/util/Success";

function PizzasList(props) {

    const dispatch = useDispatch()
    const {pizzas, error, loading} = useSelector((state) => state.getAllPizzasReducer)
    const {deleteError, deleteSuccess, deleteLoading} = useSelector((state) => state.deletePizzaReducer)

    useEffect(
        () => {

            dispatch(getAllPizzas());
        }, []
    )

    return (
        <div>
            <h2>Pizzas List</h2>

            {deleteSuccess && (<Success success={'Pizza Deleted Successfully'}/>)}
            {deleteLoading && (<Load />)}
            {deleteError && (<Error error={'Delete Pizza went wrong'}/>)}

            {loading ? (<Load/>) : error ? (<Error error={'Something went wrong'}/>) : (
                <table className="table table-bordered">
                    <thead className='table-dark'>
                    <tr className="text-sm-center">
                        <th scope="col">Name</th>
                        <th scope="col">Prices</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pizzas && pizzas.map(pizza => {
                        return <tr key={pizza.id}>
                            <th scope='row' style={{width: "100px"}}>{pizza.name}</th>
                            <td style={{width: "70px"}}>
                                Small: {pizza.prices[0]['small']} <br/>
                                Medium: {pizza.prices[0]['medium']} <br/>
                                Large: {pizza.prices[0]['large']} <br/>
                            </td>
                            <td style={{width: "30px"}}>{pizza.category}</td>
                            <td style={{width: "20px"}}>
                                <i className="bi bi-trash m-2" onClick={() => dispatch(deletePizza(pizza.id))}/>
                                <Link to={`/admin/editpizza/${pizza.id}`}><i className="bi bi-pencil"/></Link>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PizzasList
