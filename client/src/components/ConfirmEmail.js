import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

//This is the page that will prompt the user to enter a numeric code after signing up
export default class ConfirmEmail extends Component {
  state = {
    email: this.props.email,
    status: "",
    verficationCode: "",
  };

  componentDidMount() {
    // Display msg using toast library
    const { notificationMsg } = this.props;
    toast.info(notificationMsg, {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  handleVerificationCodeChange = (e) => {
    this.setState({ verficationCode: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleResendCode = async () => {
    if (!this.state.email) {
      return;
    }

    try {
      await Auth.resendSignUp(this.state.email.toLowerCase());
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.email || !this.state.verficationCode) {
      return;
    }

    try {
      await Auth.confirmSignUp(
        this.state.email.toLowerCase(),
        this.state.verficationCode
      );
      this.setState({ status: "CODE_CONFIRMED" });
    } catch (error) {
      console.log("Error on confirming code", error);
    }
  };

  render() {
    if (this.state.status === "CODE_CONFIRMED") {
      const msg = "Email confirmed! You may now login";
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { notificationMsg: msg },
          }}
        />
      );
    }

    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Email Code Confirmation</h3>
              {!this.props.email && (
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
              )}
              <div className="form-group">
                <label>Enter code here</label>
                <input
                  value={this.state.verficationCode}
                  onChange={this.handleVerificationCodeChange}
                  type="text"
                  className="form-control"
                  placeholder="6 digit code"
                />
              </div>
              <ul style={{ display: "flex", justifyContent: "space-between" }}>
                <li className="nav-item">
                  <p className="forgot-password text-left">
                    Need a new code? Enter email above then{" "}
                    <a
                      href="#confirm"
                      style={{ cursor: "pointer" }}
                      className="forgot-password text-left"
                      onClick={this.handleResendCode}
                    >
                      Click Here
                    </a>
                  </p>
                </li>
                <li className="nav-item">
                  <p className="forgot-password text-left">
                    <a
                      href="/sign-up"
                      style={{ cursor: "pointer" }}
                      className="forgot-password text-left"
                    >
                      Click here to go back to sign up
                    </a>
                  </p>
                </li>
              </ul>
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
