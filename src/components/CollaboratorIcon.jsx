import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";

export class CollaboratorIcon extends Component {
  render() {
    return (
      <div>
        <IconButton onClick={() => this.props.collaborator()}>
          <img src={require("../assets/collaborator.svg")} alt="collaborator" />
        </IconButton>
      </div>
    );
  }
}

export default CollaboratorIcon;
