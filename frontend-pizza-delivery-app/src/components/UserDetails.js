import React, {useEffect, useState} from 'react';
import {setJWTToken} from "../actions/setJWTToken";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, userRegistration} from "../actions/authAct";
import {useHistory} from "react-router-dom";

function UserDetails() {

    const dispatch = useDispatch()
    const history = useHistory();
    const { token, user, userId } = useSelector((state) => state.getLogInUser)

    const [firstName, setFirstName] = useState(`${user.firstName}`);
    const [lastName, setLastName] = useState(`${user.lastName}`);

    useEffect(
        () => {

            setJWTToken(token)
            dispatch(getUserDetails(userId));

        } , []
    )

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(userRegistration({firstName, lastName}, history));
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>User Details</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Your First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name={firstName}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Your Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name={lastName}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <button disabled={!firstName || !lastName} className="btn btn-primary">
                                Update User Info
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetails;
