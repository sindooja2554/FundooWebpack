import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteDialogBox from "./DeleteDialog";

export class DeleteIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
    };
  }

  setDeleteNote() {
    this.setState({
      openDeleteDialog: true,
    });
  }

  handleDialogClose = () => {
    this.setState({
      openDeleteDialog: false,
    });
  };

  deleteNote = () => {
    this.setState({
      openDeleteDialog: false,
    });
    this.props.deleteNote();
  };

  render() {
    return (
      <div className="delete_icons">
        <IconButton onClick={() => this.setDeleteNote()}>
          <img src={require("../assets/delete.svg")} alt="delete_note" />
        </IconButton>
        <IconButton onClick={() => this.props.restoreTrash()}>
          <img src={require("../assets/restore.svg")} alt="restore_note" />
        </IconButton>
        <DeleteDialogBox
          open={this.state.openDeleteDialog}
          handleClose={this.handleDialogClose}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default DeleteIcon;
