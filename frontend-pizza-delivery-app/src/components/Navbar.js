import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {userLogOut} from "../actions/authAct";
import {setJWTToken} from "../actions/setJWTToken";
import {getAllPizzas} from "../actions/pizzaAct";


function Navbar(props) {

   const dispatch = useDispatch();
   const history = useHistory();
   const { token } = useSelector((state) => state.getLogInUser)

    const logout = () => {
        dispatch(userLogOut(history));
    };

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
                                    <Link className="nav-link" to="/card">
                                        Card
                                    </Link>
                                </li>


                                {/*<li className="nav-item">*/}
                                {/*    <Link className="nav-link" to="/user">*/}
                                {/*        User Info*/}
                                {/*    </Link>*/}
                                {/*</li>*/}


                                <li className="nav-item">
                                    <a className="nav-link pointer" href="#" onClick={logout}>
                                        Logout
                                    </a>
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
