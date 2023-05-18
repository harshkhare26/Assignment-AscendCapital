import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class SignUp extends Component {
    render() {
        return (
      <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <ul>
                    <li className="nav-item">
                    <p className="forgot-password text-left"> Already registered? 
                        <Link className="forgot-password text-right" to={"/sign-in"}> Click Here to sign in</Link>
                    </p>
                    </li>
                </ul>
                
            </form>
        );
    }
}