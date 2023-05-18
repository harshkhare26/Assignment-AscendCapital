import React, { Component } from "react";

//The home page with a welcome message to the user
export default class HomePage extends Component {
  render() {
    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div className="home-text h3">
              <h3> Welcome to K-board!</h3>
              <div className="home-text p">
                <p>Project management made easier. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
