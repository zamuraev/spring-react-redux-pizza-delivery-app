import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import { useDispatch } from "react-redux";
import {userRegistration} from "../../actions/authAct";
import {useHistory} from "react-router-dom";

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [cpassword, setcpassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(cpassword!==password) {
            alert('Passwords not match')
        } else {
        dispatch(userRegistration({firstName, lastName, password, email}, history));
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>Register</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <RegisterForm
                            handleSubmit={handleSubmit}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            password={password}
                            setPassword={setPassword}
                            email={email}
                            setEmail={setEmail}
                            cpassword={cpassword}
                            setcpassword={setcpassword}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
