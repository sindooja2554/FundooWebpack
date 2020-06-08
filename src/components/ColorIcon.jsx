import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";

export class ColorIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <IconButton onClick={(event) => this.props.setColor(event)}>
          <img src={require("../assets/color_palatte.svg")} alt="color" />
        </IconButton>
      </div>
    );
  }
}

export default ColorIcon;
