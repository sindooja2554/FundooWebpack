import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";

export class ReminderIcon extends Component {
  render() {
    return (
      <div>
        <IconButton onClick={(event) => this.props.setReminder(event)}>
          <img src={require("../assets/reminder.svg")} alt="reminder" />
        </IconButton>
      </div>
    );
  }
}

export default ReminderIcon;
