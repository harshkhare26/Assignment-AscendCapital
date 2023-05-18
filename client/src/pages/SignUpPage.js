import React, { Component } from "react";
import { Link } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import ConfirmEmail from "../components/ConfirmEmail";

Amplify.configure(awsconfig);

class SignUpPage extends Component {
  state = {
    email: "",
    password: "",
    status: "SIGN_UP",
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.email === "" || this.state.password === "") {
      return;
    }

    try {
      await Auth.signUp(this.state.email.toLowerCase(), this.state.password);
      this.setState({ status: "CONFIRM_EMAIL" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.status === "CONFIRM_EMAIL") {
      const msg = "Check your email for a code to confirm your account!";
      return (
        <ConfirmEmail
          email={this.state.email.toLowerCase()}
          notificationMsg={msg}
        />
      );
    }

    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label>Email address</label>
                <input
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Sign Up
              </button>
              <ul style={{ display: "flex", justifyContent: "space-between" }}>
                <li className="nav-item">
                  <p className="forgot-password text-left">
                    {" "}
                    Already registered?
                    <Link className="forgot-password text-right" to={"/login"}>
                      {" "}
                      Click Here to sign in
                    </Link>
                  </p>
                </li>
                <li className="nav-item">
                  <p className="forgot-password text-left">
                    Have a verification code?{" "}
                    <a
                      href="#confirm"
                      style={{ cursor: "pointer" }}
                      className="forgot-password text-left"
                      onClick={() => this.setState({ status: "CONFIRM_EMAIL" })}
                    >
                      Click Here
                    </a>
                  </p>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUpPage;
