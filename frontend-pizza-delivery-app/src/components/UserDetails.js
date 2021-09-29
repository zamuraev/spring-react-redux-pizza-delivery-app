import React, {useState} from 'react';
import {updateUserDetails} from "../actions/usersActions";
import {useDispatch, useSelector,} from "react-redux";
import {useHistory} from "react-router-dom";

function UserDetails() {

    const {currentUser} = useSelector((state) => state.loginUserReducer)
    const dispatch = useDispatch();
    const history = useHistory();

    const [fistName, setFistName] = useState(currentUser.firstName);
    const [lastname, setLastName] = useState(currentUser.lastName);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails(currentUser.userId, fistName, lastname, history));
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
                                    value={fistName}
                                    onChange={(e) => setFistName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Your Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <button disabled={!fistName || !lastname} className="btn btn-primary">
                                Update User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetails;
