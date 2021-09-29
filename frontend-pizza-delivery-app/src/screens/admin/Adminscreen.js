import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Link, Route, Switch, useHistory} from "react-router-dom";
import UsersList from "./UsersList";
import AddPizza from "./AddPizza";
import OrdersList from "./OrdersList";
import PizzasList from "./PizzasList";
import EditPizza from "./EditPizza";

function Adminscreen(props) {

    const {currentUser} = useSelector((state) => state.loginUserReducer)
    const history = useHistory();

    useEffect(
        () => {
            if (!currentUser.isAdmin) {
                history.push('/')
            }
        }, [currentUser]
    )

    return (
        <div>
            <div className="raw justify-content-center d-flex">
                <div className="col-md-10">
                    <h1 style={{fontSize: '35px', display: 'inline'}}>Admin Panel</h1>
                    <i className="bi bi-gear-fill"/>

                    <ul className='adminFunctions mt-4'>
                        <li><Link to={"/admin/userslist"}>Users List</Link></li>
                        <li><Link to={"/admin/pizzaslist"}>Pizzas List</Link></li>
                        <li><Link to={"/admin/addpizza"}>Add New Pizza</Link></li>
                        <li><Link to={"/admin/orderslist"}>Orders List</Link></li>
                    </ul>

                    <Switch>
                        <Route path="/admin/userslist" component={UsersList} exact/>
                        <Route path="/admin/orderslist" component={OrdersList} exact/>
                        <Route path="/admin/pizzaslist" component={PizzasList} exact/>
                        <Route path="/admin/addpizza" component={AddPizza} exact/>
                        <Route path="/admin/editpizza/:pizzaid" component={EditPizza} exact/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Adminscreen;
