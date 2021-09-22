import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {getUserDetails, userLogOut} from "../actions/authAct";
import {DropdownButton, Dropdown} from "react-bootstrap";

function Navbar(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {token,currentUser,userId} = useSelector((state) => state.getLogInUser)
    const {cartItems} = useSelector((state) =>state.cartReducer)

    const logout = () => {
        dispatch(userLogOut(history));
    };

    useEffect(
        () => {
            dispatch(getUserDetails(userId));
        } , []
    )

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">

                <Link className="navbar-brand" to="/">
                    SHEY PIZZA
                </Link>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {token && (
                            <>
                                <li className="nav-item">
                                    <DropdownButton id="dropdown-basic-button" title={currentUser.firstName}>
                                        <Dropdown.Item href="/userInfo">User Info</Dropdown.Item>
                                        <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
                                    </DropdownButton>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link pointer" to="/cart">
                                        Cart
                                        <i className="bi bi-basket3 ml-2 mr-2">{cartItems.length}</i>
                                    </Link>
                                </li>
                            </>
                        )}

                        {!token && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
