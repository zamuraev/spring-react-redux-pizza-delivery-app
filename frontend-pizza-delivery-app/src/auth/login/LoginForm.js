import React from 'react';
import {Link} from "react-router-dom";

const LoginForm =
    ({
         handleSubmit,
         email,
         setEmail,
         password,
         setPassword
     }) => (




        <div>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="form-group mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button disabled={!email || !password} className="btn btn-primary mb-3">
                    Submit
                </button>
            </form>
            <Link to={'/register'} style={{color: 'black'}}>Click here to Register</Link>
        </div>
    );


export default LoginForm;
