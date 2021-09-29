import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/Navbar";
import NotFound from "./components/util/NotFound";
import Homescreen from "./screens/Homescreen";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Cartscreen from "./screens/Cartscreen";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import UserDetails from "./components/UserDetails";
import Orderscreen from "./screens/Orderscreen";
import Adminscreen from "./screens/admin/Adminscreen";
import React from "react";


function App() {

    return (

        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Homescreen}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/cart" exact component={Cartscreen}/>
                    <Route path="/userInfo" exact component={UserDetails}/>
                    <Route path="/orders" exact component={Orderscreen}/>
                    <Route path="/admin" component={Adminscreen}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

// npm install react-redux redux
// npm install --save redux-thunk
// npm install axios --save
// npm install react-router-dom --save
// npm i react-stripe-checkout
// npm i react-bootstrap
// npm install --save redux-devtools-extension
// ,  "proxy": "http://localhost:8080"
// npm install jwt-decode
// npm install --save react-toastify
//npm install --save @fortawesome/fontawesome-free
