import React, { Component } from "react";
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Create";
import "../scss/NoteIcon.scss";
import DeleteDialog from "./DeleteDialog";
const Service = require("../services/service");

export class EditLabelDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      labelName: "",
      disabled: true,
      getLabels: [],
      checkId: null,
      exist: false,
      openDeleteDialog: false,
      title: "Label",
      deleteId: "",
    };
  }

  input = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  changeValue(event) {
    this.setState({
      labelName: event.target.value,
    });
  }

  focusInput = (component) => {
    if (component) {
      component.focus();
    }
  };

  handleDisabled = () => {
    this.setState({
      disabled: false,
    });
  };

  handleDisable = () => {
    this.setState({
      disabled: true,
      label: "",
    });
  };

  handleDialogClose = () => {
    this.setState({
      openDeleteDialog: false,
    });
  };

  changeLabel = (item) => {
    console.log("key ---------------->", item);
    this.setState({
      checkId: item._id,
      labelName: item.name,
    });
  };

  createLabel = () => {
    console.log(this.state.label);
    this.handleDisable();
    let request = {
      label: this.state.label,
    };
    this.state.getLabels.forEach((element) => {
      if (element.name === request.label) {
        this.setState({
          exist: true,
          label: "",
        });
      }
    });
    if (this.state.exist === false) {
      Service.createLabel(request)
        .then((data) => {
          this.state({
            label: "",
          });
          this.state.getLabels.push(request.label);
          console.log("data-------------->", data);
          this.props.getAllLabels();
        })
        .catch((error) => {
          console.log("error------------->", error);
        });
    }
  };

  editLabel = (item) => {
    this.setState({
      checkId: "",
    });
    let request = {
      _id: item._id,
      label: this.state.labelName,
    };
    console.log("item----------------->", request);
    Service.updateLabel(request)
      .then((data) => {
        this.props.getAllLabels();
        this.state.getLabels.push(request.label);
        console.log("data------------>", data);
      })
      .catch((error) => {
        console.log("error---------------->", error);
      });
  };

  delete = (item) => {
    console.log("in delete");
    this.setState({
      openDeleteDialog: true,
      deleteId: item._id,
    });
  };

  deleteLabel = () => {
    let request = {
      _id: this.state.deleteId,
    };
    Service.deleteLabel(request)
      .then((data) => {
        console.log("data------------------->", data);
        for (let i = 0; i < this.state.getLabels.length; i++) {
          if (this.state.getLabels[i]._id === request._id) {
            this.state.getLabels.splice(i, 1);
            this.props.getAllLabels();
            this.handleDialogClose();
          }
        }
      })
      .catch((error) => {
        console.log("error----------------->", error);
      });
  };

  UNSAFE_componentWillMount() {
    this.setState({
      getLabels: this.props.getLabels,
    });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openEditLabel}
          aria-labelledby="form-dialog-title"
        >
          {/* onClose={this.props.handleEditLabelsClose()} */}
          <DialogTitle id="form-dialog-title">Edit Labels</DialogTitle>
          <DialogContent>
            {this.state.disabled ? (
              <div className="disabledDiv">
                <IconButton onClick={() => this.handleDisabled()}>
                  <AddIcon />
                </IconButton>
                <TextField
                  disabled
                  id="standard-disabled"
                  placeholder="Create new label"
                  name="label"
                  value={this.state.label}
                  fullWidth
                  onClick={() => this.handleDisabled()}
                />
              </div>
            ) : (
              <div className="disabledDiv">
                <IconButton onClick={() => this.handleDisable()}>
                  <ClearIcon />
                </IconButton>
                <TextField
                  autoFocus
                  margin="dense"
                  id="label"
                  placeholder="Create new label"
                  name="label"
                  value={this.state.label}
                  onChange={(event) => this.input(event)}
                  fullWidth
                />
                <IconButton onClick={() => this.createLabel()}>
                  <DoneIcon />
                </IconButton>
              </div>
            )}
            {this.state.getLabels.map((item, index) => (
              <div className="disabledDiv" key={index}>
                {this.state.checkId !== item._id ? (
                  <div className="disabledDiv" key={index}>
                    <IconButton onClick={() => this.delete(item)}>
                      <img src={require("../assets/delete.svg")} alt="delete" />
                    </IconButton>
                    <TextField
                      disabled
                      id={index + "standard-disabled"}
                      defaultValue={item.label}
                      fullWidth
                      onClick={() => this.changeLabel(item)}
                    />
                    <IconButton onClick={() => this.changeLabel(index)}>
                      <CreateIcon />
                    </IconButton>
                  </div>
                ) : (
                  <div className="disabledDiv" key={index}>
                    <IconButton onClick={() => this.delete(item)}>
                      <img src={require("../assets/delete.svg")} alt="delete" />
                    </IconButton>
                    <TextField
                      autoFocus
                      margin="dense"
                      id={index + "standard-read-only-input"}
                      name="label"
                      ref={this.focusInput}
                      value={this.state.labelName}
                      fullWidth
                      onChange={(event) => this.changeValue(event)}
                    />
                    <IconButton onClick={() => this.editLabel(item)}>
                      <DoneIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            ))}
            {this.state.openDeleteDialog === true && (
              <DeleteDialog
                title={this.state.title}
                open={this.state.openDeleteDialog}
                handleClose={this.handleDialogClose}
                deleteNote={this.deleteLabel}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.handleEditLabelsClose()}
              color="primary"
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditLabelDialog;
