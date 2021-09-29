import React from 'react';
import {Link} from "react-router-dom";
import Load from "../../components/util/Load";
import Success from "../../components/util/Success";
import Error from "../../components/util/Error";

const RegisterForm = ({

    handleSubmit,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    email,
    setEmail,
    cpassword,
    setcpassword,
    registerState

}) => (

    <div>

        {registerState.loading && (<Load />)}
        {registerState.success && (<Success success={'User Registered Successfully'} />)}
        {registerState.error && (<Error error={'Something when wrong'} />)}

        <form onSubmit={handleSubmit} className="mt-3">
            <div className="form-group mb-3">
                <label className="form-label">Your First Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Your Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Confirm password</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Confirm password"
                    value={cpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                />
            </div>

            <button disabled={!firstName || !lastName || !email || !password || !cpassword} className="btn btn-primary mb-3">
                Submit
            </button>
            <br/>
        </form>
        <Link to={'/login'} style={{color: 'black'}}>Click here to Login</Link>
    </div>

);

export default RegisterForm;
