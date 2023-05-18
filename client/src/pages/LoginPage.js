import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

Amplify.configure(awsconfig);

//The login page where the user will enter an email and password
class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    status: "",
  };

  componentDidMount() {
    // If passed in a notification message, use toast to
    // display it
    if (this.props.location.state) {
      const { notificationMsg } = this.props.location.state;
      toast.success(notificationMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    if (this.state.email === "" || this.state.password === "") {
      return;
    }

    try {
      const user = await Auth.signIn(
        this.state.email.toLowerCase(),
        this.state.password
      );
      dispatch(signIn(user.username));
      this.setState({ status: "LOGGED_IN" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.status === "LOGGED_IN") {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Log In</h3>
              <div className="form-group">
                <label>Email address</label>
                <input
                  onChange={this.handleEmailChange}
                  value={this.state.email}
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
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <ul>
                <li className="nav-item">
                  <p className="forgot-password text-left">
                    {" "}
                    Don't have an account?
                    <Link
                      className="forgot-password text-right"
                      to={"/sign-up"}
                    >
                      {" "}
                      Click Here to sign up
                    </Link>
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

export default connect()(LoginPage);
