import React from 'react';

const RegisterForm = ({

    handleSubmit,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    email,
    setEmail

}) => ( <form onSubmit={handleSubmit} className="mt-3">
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
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button disabled={!firstName || !lastName || !email || !password} className="btn btn-primary">
            Submit
        </button>
    </form>
);


export default RegisterForm;
