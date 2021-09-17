import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Homescreen from "./screens/Homescreen";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Card from "./components/Card";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import UserDetails from "./components/UserDetails";


function App() {

    return (
    <div className="App">
    <BrowserRouter>
     <Navbar />
     <Switch>
         <Route exact path="/" component={Homescreen} />
         <Route exact path="/login" component={Login} />
         <Route exact path="/register" component={Register} />
         <Route exact path="/card" component={Card} />
         <Route exact path="/userInfo" component={UserDetails} />
         <Route path="*" component={NotFound} />
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
