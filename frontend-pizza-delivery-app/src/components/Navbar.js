import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {userLogOut} from "../actions/usersActions";
import {Dropdown, DropdownButton} from "react-bootstrap";

function Navbar(props) {

    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.loginUserReducer)
    const {cartItems} = useSelector((state) =>state.cartReducer)

    const logOut = () => {
        dispatch(userLogOut());
    };

    useEffect(
        () => {
          } , [currentUser]
    )

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">

                <i className="bi bi-exclude" />
                <Link className="navbar-brand" to="/">
                    PIZZA SHOP
                </Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {!currentUser && (
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

                        {currentUser && (
                            <>

                                {(currentUser.isAdmin)&& (
                                <li className="nav-item">
                                    <Link className="nav-link pointer" to="/admin">
                                        Admin Panel
                                    </Link>
                                </li>
                            )}

                                <li className="nav-item">
                                    <DropdownButton id="dropdown-basic-button" title={currentUser.firstName}>
                                        <Dropdown.Item href="/userInfo">User Info</Dropdown.Item>
                                        <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                                        <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
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

                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
