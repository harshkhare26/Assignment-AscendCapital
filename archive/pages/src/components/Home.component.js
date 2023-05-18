import React, { Component } from "react";

//The home page with a welcome message to the user 
export default class Home extends Component {
  
    render() {
      return (
        <div> 
          <div className = "home-text h3">
          <h3> Welcome to K-board!
          <div className = "home-text p">
            <p>Project management made easier. </p>
          </div>
          </h3>
        </div>
          </div>
      );
    };
    }
