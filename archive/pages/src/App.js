import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


//Imports from all the pages that are required for routing 
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Confirm from "./components/confirmation.email";
import Home from "./components/Home.component";


//Renders all the pages with the header 
function App() {
  return (
  <Router>
    <div className="App">
      {/*Header code*/}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}>K-Board</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link> 
              </li>
            </ul>
          </div>
        </div>
      </nav> 

        {/*Routing for all the pages*/}
          <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/confirm" component={Confirm} />
              <Route path="/" component={Home}/>
            </Switch>
          </div>
         </div>
      
    </div>
  </Router>
  );
}

export default App;
