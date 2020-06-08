import React, { Component } from "react";
import "../scss/Fundoo.scss";

export class Fundoo extends Component {
  render() {
    return (
      <div className="app-name">
        <b>
          <span className="blue">F</span>
          <span className="red">U</span>
          <span className="yellow">N</span>
          <span className="blue">D</span>
          <span className="green">O</span>
          <span className="red">O</span>
        </b>
      </div>
    );
  }
}

export default Fundoo;
