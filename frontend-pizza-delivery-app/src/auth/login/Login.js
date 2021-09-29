import { useState } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import {userLogin} from "../../actions/usersActions";
import {useHistory} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch( userLogin({email,password}, history))

    };

    return (
        <>
            <div className="bg-secondary p-5 text-center">
                <h1>Login</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <LoginForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
