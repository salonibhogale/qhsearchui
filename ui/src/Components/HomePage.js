import React, { Component } from "react";

export default class HomePage extends Component {
  render() {
    return (
      <div className="content overflow-auto">
        <div className="text-content">
          <p> Welcome to Parliamentary Questions Data Portal</p>
          <img
            src={require("../Assets/Images/ambedkar-statue-at-parliament.png")}
          ></img>
        </div>
      </div>
    );
  }
}
