import React from "react";
import { signOut } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

function NavBar(props) {
  const { auth, dispatch } = props;

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      dispatch(signOut());
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/home"}>
          K-Board
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/home"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>

            {auth.isAuthenticated ? (
              <li className="nav-item" onClick={handleLogout}>
                <div className="nav-link" style={{ cursor: "pointer" }}>
                  Logout
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NavBar);
