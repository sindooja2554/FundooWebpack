import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { IconButton, Button } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CollaboartorDialog from "./CollaboratorDialog";
import NoteIcon from "./NoteIcon";
import InputBase from "@material-ui/core/InputBase";
import "../scss/Dashboard.scss";
import "../scss/DisplayNote.scss";
const Service = require("../services/service");
const FetchService = require("../services/fetchService");

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        height: "50px",
      },
    },
    MuiButton: {
      contained: {
        color: "#287AE6",
        box: {
          shadow:
            " 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        },
        backgroundColor: "white",
      },
    },
  },
});

export class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      color: {
        name: "white",
        code: "#FFFFFF",
      },
      isArchive: false,
      labels: [],
      isPinned: false,
      isTrash: false,
      labelName: "",
      from: "Create_Note",
      noteLabels: [],
      collaborator: [],
      openCollaboratorDialog: false,
      label: "onCreateNote",
      reminder: null,
    };
  }

  getReminderData = (date, time) => {
    if (date !== null && time !== null) {
      let newTime = time.toString().slice(16, 25),
        dateFront = date.toString().slice(3, 10);
      let reminder =
        dateFront + "," + date.toString().slice(11, 15) + " " + newTime;
      this.setState({
        reminder: reminder,
      });
      console.log("reminder...........", reminder);
    }
  };

  handleReminder = () => {
    this.setState({
      reminder: null,
    });
  };

  setCollaborator = () => {
    this.setState({
      openCollaboratorDialog: !this.state.openCollaboratorDialog,
    });
  };

  closeCollaboratorDialog = () => {
    this.setState({
      openCollaboratorDialog: false,
    });
    // this.props.getAllNotes();
  };

  setAddCollaborator = (element) => {
    console.log("collaborator state", element);
    element.forEach((key) => {
      this.state.collaborator.push(key);
    });
    this.setState({
      collaborator: this.state.collaborator,
    });
    console.log("collaborator state", this.state.collaborator);
  };

  removeCollaborator = (element) => {
    console.log(element);
    for (let i = 0; i < element.length; i++) {
      for (let j = 0; j < this.state.collaborator.length; j++) {
        if (element[i].email === this.state.collaborator[j].email) {
          this.state.collaborator.splice(j, 1);
          this.setState({
            collaborator: this.state.collaborator,
          });
        }
      }
    }
  };

  getColor = (element) => {
    this.setState({
      color: {
        name: element.name,
        code: element.code,
      },
    });
  };

  getArchive = () => {
    this.setState({
      isArchive: !this.state.isArchive,
    });
    if (this.state.isPinned !== false) {
      this.setState({
        isPinned: !this.state.isPinned,
      });
    }
  };

  changePin = () => {
    this.setState({
      isPinned: !this.state.isPinned,
    });
    if (this.state.isArchive !== false) {
      this.setState({
        isArchive: !this.state.isArchive,
      });
    }
  };

  input = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  close = (event) => {
    this.props.handleToggle(event);
    if (this.state.title !== "" && this.state.description !== "") {
      let request = {
        title: this.state.title,
        description: this.state.description,
        labels: this.state.labels,
        color: {
          name: this.state.color.name,
          code: this.state.color.code,
        },
        isArchive: this.state.isArchive,
        isTrash: this.state.isTrash,
        isPinned: this.state.isPinned,
        remainder: this.state.reminder,
      };
      Service.create_note(request, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          console.log(
            this.state.collaborator.length === 0,
            "   ",
            this.state.labels.length === 0
          );
          if (
            this.state.collaborator.length === 0 &&
            this.state.labels.length === 0
          ) {
            this.props.getAllNotes();
          } else {
            let count = 0;
            this.addCollaborator(data.data.data._id);
            if (this.state.labels.length !== 0) {
              this.state.labels.forEach((element) => {
                count++;
                let request = {
                  _id: data.data.data._id,
                  label: element.label,
                  labelId: element._id || null,
                };

                Service.addLabelToNote(request)
                  .then((data) => {
                    if (count === this.state.labels.length) {
                      console.log("count", count);
                      if (this.state.collaborator.length === 0) {
                        this.props.getAllNotes();
                      }
                      this.setState({
                        title: "",
                        description: "",
                        labels: [],
                        color: {
                          name: "white",
                          code: "#FFFFFF",
                        },
                        isArchive: false,
                        isTrash: false,
                        isPinned: false,
                        remainder: null,
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            }
          }
        }
      });
    } else {
      this.setState({
        title: "",
        description: "",
        labels: [],
        color: {
          name: "white",
          code: "#FFFFFF",
        },
        isArchive: false,
        isTrash: false,
        isPinned: false,
        remainder: null,
      });
    }
  };

  addCollaborator = (noteId) => {
    this.state.collaborator.forEach((element) => {
      let request = {
        email: element.email,
        noteId: noteId,
      };
      FetchService.addCollaborator(request)
        .then((data) => {
          console.log("data", data);
          this.props.getAllNotes();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  handleChecked = (event, item) => {
    if (event.target.checked === true) {
      this.state.labels.push(item);
      this.setState({
        labels: this.state.labels,
      });
      console.log("state--->", this.state.labels);
    } else {
      for (let i = 0; i < this.state.labels.length; i++) {
        if (this.state.labels[i]._id === item._id) {
          this.state.labels.splice(i, 1);
          this.setState({
            labels: this.state.labels,
          });
          console.log("state--->", this.state.labels);
        }
      }
    }
  };

  createLabels = (item) => {
    this.state.labels.push(item);
    this.setState({
      labels: this.state.labels,
    });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.labelData !== undefined) {
      if (
        this.props.labelData[0] !== undefined &&
        prevProps.labelData[0] !== undefined
      ) {
        if (this.props.labelData[0].label !== prevProps.labelData[0].label) {
          this.state.labels.pop();
          this.state.labels.push(this.props.labelData);
          this.setState({
            labels: this.state.labels,
          });
        }
      }
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.title === "label") {
      console.log(
        "labelData==================>",
        this.props.labelData,
        this.props.openNoteEditor
      );
      this.setState({
        labels: this.props.labelData,
      });
    } else if (this.props.title === "reminder") {
      let date = new Date();
      let newTime = "19:00:00",
        dateFront = date.toString().slice(3, 10);
      let reminder =
        dateFront + "," + date.toString().slice(11, 15) + " " + newTime;
      console.log(date.toString().slice(16, 25));
      this.setState({
        reminder: reminder,
      });
    }
  }

  render() {
    return (
      <div className={this.props.openNoteEditor ? "notes" : "note"}>
        <MuiThemeProvider theme={theme}>
          {this.props.openNoteEditor ? (
            <div className="card-create-note">
              <ClickAwayListener onClickAway={(event) => this.close(event)}>
                <div className="card">
                  <Card style={{ backgroundColor: this.state.color.code }}>
                    <div className="formInput">
                      <form
                        noValidate
                        autoComplete="off"
                        className="formCreateNote"
                      >
                        <div className="textField">
                          <TextField
                            placeholder="Title"
                            variant="standard"
                            name="title"
                            value={this.state.title}
                            onChange={(event) => this.input(event)}
                            fullWidth
                          />
                        </div>
                        <div className="textField">
                          <TextField
                            placeholder="Take a note..."
                            variant="standard"
                            name="description"
                            value={this.state.description}
                            onChange={(event) => this.input(event)}
                            fullWidth
                          />
                        </div>
                        <div className="label-collaborator">
                          {this.state.reminder !== null && (
                            <div className="reminder">
                              <Chip
                                label={this.state.reminder}
                                onDelete={() => this.handleReminder()}
                              />
                            </div>
                          )}
                          {this.state.labels.length !== 0 && (
                            <div className="labelsArray">
                              {this.state.labels.map((item, index) => (
                                <div key={index} className="labelsDiv">
                                  <Chip label={item.label} />
                                </div>
                              ))}
                            </div>
                          )}
                          {this.state.collaborator.length !== 0 && (
                            <div className="collaborator">
                              {this.state.collaborator.map((item, index) => (
                                <div key={index}>
                                  <IconButton
                                    onClick={() => this.setCollaborator(item)}
                                  >
                                    <Avatar>{item.email.charAt(0)}</Avatar>
                                  </IconButton>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </form>
                      <div className="pinForm">
                        {this.state.isPinned ? (
                          <IconButton onClick={(event) => this.changePin()}>
                            <img
                              src={require("../assets/unpinned.svg")}
                              alt="unpin_icon"
                            />
                          </IconButton>
                        ) : (
                          <IconButton onClick={(event) => this.changePin()}>
                            <img
                              src={require("../assets/pin_icon.svg")}
                              alt="pin_icon"
                            />
                          </IconButton>
                        )}
                      </div>
                    </div>
                    <div className="iconsDiv">
                      <NoteIcon
                        getColor={this.getColor}
                        getArchive={this.getArchive}
                        title={this.state.from}
                        handleChecked={this.handleChecked}
                        labels={this.props.labels}
                        noteLabels={this.state.noteLabels}
                        createLabels={this.createLabels}
                        setAddCollaborator={this.setAddCollaborator}
                        removeCollaborator={this.removeCollaborator}
                        getReminder={this.getReminderData}
                      />
                      <Button
                        variant="contained"
                        onClick={(event) => this.close(event)}
                      >
                        Close
                      </Button>
                    </div>
                  </Card>
                </div>
              </ClickAwayListener>
            </div>
          ) : (
            <div className="create-note">
              <form
                noValidate
                autoComplete="off"
                onClick={this.props.handleToggle}
                className="form"
              >
                <InputBase
                  disabled
                  id="outlined-disabled"
                  defaultValue="Take a note..."
                  fullWidth
                  onClick={this.props.handleToggle}
                />
                <div className="icons">
                  <IconButton>
                    <img
                      src={require("../assets/new_list.svg")}
                      alt="new_list"
                    />
                  </IconButton>
                  <IconButton>
                    <img
                      src={require("../assets/paint_brush.svg")}
                      alt="paint_brush"
                    />
                  </IconButton>
                  <IconButton>
                    <img
                      src={require("../assets/image_icon.svg")}
                      alt="image_icon"
                    />
                  </IconButton>
                </div>
              </form>
            </div>
          )}

          {this.state.openCollaboratorDialog === true && (
            <CollaboartorDialog
              openCollaboratorDialog={this.state.openCollaboratorDialog}
              note={this.state.collaborator}
              closeCollaboratorDialog={this.closeCollaboratorDialog}
              title={this.state.from}
              setAddCollaborator={this.setAddCollaborator}
              removeCollaborator={this.removeCollaborator}
              label={this.state.label}
            />
          )}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default CreateNote;
