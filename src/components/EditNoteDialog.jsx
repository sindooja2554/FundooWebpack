import React, { Component } from "react";
import { Button, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import NoteIcon from "./NoteIcon";
import DeleteIcon from "./DeleteIcon";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import CollaboartorDialog from "./CollaboratorDialog";
import "../scss/DisplayNote.scss";
const Service = require("../services/service");

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: { backgroundColor: "white" },
    },
  },
});

export class EditNoteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {
        name: this.props.note.color.name,
        code: this.props.note.color.code,
      },
      isPinned: this.props.note.isPinned,
      title: this.props.note.title,
      description: this.props.note.description,
      isArchive: this.props.note.isArchive,
      labels: this.props.note.labels,
      collaborator: this.props.note.collaborator,
      reminder: this.props.note.remainder,
      componentTitle: "EditNote",
      openCollaboratorDialog: false,
    };
  }

  input = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getReminderData = (date, time) => {
    if (date !== null && time !== null) {
      let newTime = time.toString().slice(16, 25),
        dateFront = date.toString().slice(3, 10);
      let reminder =
        dateFront + "," + date.toString().slice(11, 15) + " " + newTime;

      this.setState({
        reminder: reminder,
      });

      let request = {
        noteId: this.props.note._id,
        remainder: reminder,
      };
      Service.addReminder(request)
        .then((response) => {
          // this.props.getAllNotes();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleReminder = () => {
    let request = {
      noteId: this.props.note._id,
      remainder: null,
    };
    Service.removeReminder(request)
      .then((data) => {
        // this.props.getAllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setAddCollaborator = (element) => {
    console.log("collaborator state", this.state.collaborator);
    this.setState({
      collaborator: this.state.collaborator,
    });
  };

  removeCollaborator = (element) => {
    console.log(element);
    for (let i = 0; i < element.length; i++) {
      for (let j = 0; j < this.state.collaborator.length; j++) {
        if (element[i].collaboratorId === this.state.collaborator[j]._id) {
          this.state.collaborator.splice(j, 1);
          this.setState({
            collaborator: this.state.collaborator,
          });
        }
      }
    }
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

  changePin = () => {
    this.setState({
      isPinned: !this.state.isPinned,
    });
    let request = {
      title: this.state.title,
      description: this.state.description,
      color: {
        name: this.state.color.name,
        code: this.state.color.code,
      },
      isPinned: !this.state.isPinned,
      isTrash: this.props.note.isTrash,
      noteId: this.props.note._id,
      isArchive: false,
    };

    Service.updateNote(request)
      .then((res) => {
        this.props.handleEditClose();
      })
      .catch((err) => {
        console.log(err);
      });
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
  };

  setArchive = () => {
    let request = {
      title: this.state.title,
      description: this.state.description,
      color: {
        name: this.state.color.name,
        code: this.state.color.code,
      },
      isPinned: false,
      isTrash: this.props.note.isTrash,
      noteId: this.props.note._id,
      isArchive: true,
    };

    Service.updateNote(request)
      .then((res) => {
        this.props.handleEditClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setTrash = () => {
    let request = {
      title: this.state.title,
      description: this.state.description,
      color: {
        name: this.state.color.name,
        code: this.state.color.code,
      },
      isPinned: false,
      isTrash: true,
      noteId: this.props.note._id,
      isArchive: false,
    };

    Service.updateNote(request)
      .then((data) => {
        this.props.handleEditClose();
      })
      .catch((error) => {
        console.log("---------->", error);
      });
  };

  editNote = () => {
    let request = {
      title: this.state.title,
      description: this.state.description,
      color: {
        name: this.state.color.name,
        code: this.state.color.code,
      },
      isPinned: this.state.isPinned,
      isTrash: this.props.note.isTrash,
      noteId: this.props.note._id,
      isArchive: this.state.isArchive,
    };
    Service.updateNote(request)
      .then((data) => {
        this.props.handleEditClose();
      })
      .catch((error) => {
        console.log("error---------->", error);
      });
  };

  handleDelete = (item) => {
    let request = {
      _id: this.props.note._id,
      labelId: item._id,
    };

    for (let i = 0; i < this.state.labels.length; i++) {
      if (this.state.labels[i]._id === item._id) {
        this.state.labels.splice(i, 1);
        this.setState({
          labels: this.state.labels,
        });
      }
    }

    Service.removeLabelFromNote(request)
      .then((data) => {
        console.log(this.state.labels);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  unSetTrash = () => {
    let request = {
      title: this.props.note.title,
      description: this.props.note.description,
      color: {
        name: this.props.note.color.name,
        code: this.props.note.color.code,
      },
      isPinned: false,
      isTrash: false,
      noteId: this.props.note._id,
      isArchive: false,
    };

    Service.updateNote(request)
      .then((data) => {
        this.props.handleEditClose();
      })
      .catch((error) => {
        console.log("---------->", error);
      });
  };

  deleteNote = () => {
    let request = {
      noteId: this.props.note._id,
    };
    Service.deleteNote(request)
      .then((data) => {
        this.props.handleEditClose();
      })
      .catch((error) => {
        console.log("error-------------->", error);
      });
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      color: {
        name: this.props.note.color.name,
        code: this.props.note.color.code,
      },
      title: this.props.note.title,
      description: this.props.note.description,
      isArchive: this.props.note.isArchive,
      isPinned: this.props.note.isPinned,
      labels: this.props.note.labels,
      collaborator: this.props.note.collaborator,
      reminder: this.props.note.remainder,
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={this.props.openEditNote}
            aria-labelledby="form-dialog-title"
            onClose={this.editNote}
          >
            <Paper
              style={{
                backgroundColor: this.state.color.code,
              }}
            >
              <DialogContent>
                <div className="textfield-icon">
                  <TextField
                    id="title"
                    margin="dense"
                    name="title"
                    value={this.state.title}
                    onChange={(event) => this.input(event)}
                    fullWidth
                  />
                  {this.props.trash !== "Trash" && (
                    <div>
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
                  )}
                </div>
                <div className="editDescription">
                  <TextField
                    autoFocus
                    id="description"
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
                          <Chip
                            label={item.label}
                            onDelete={() => this.handleDelete(item)}
                          />
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
                            {item.imageUrl.length !== 0 ? (
                              <Avatar alt="Color" src={item.imageUrl} />
                            ) : (
                              <div>
                                {item.firstName !== undefined ? (
                                  <Avatar>{item.firstName.charAt(0)}</Avatar>
                                ) : (
                                  <Avatar>
                                    <PersonIcon />
                                  </Avatar>
                                )}
                              </div>
                            )}
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <div className="dialogAction">
                  {this.props.trash === "Trash" ? (
                    <DeleteIcon
                      restoreTrash={this.unSetTrash}
                      deleteNote={this.deleteNote}
                    />
                  ) : (
                    <NoteIcon
                      archive={this.props.archive}
                      getColor={this.getColor}
                      getArchive={this.getArchive}
                      setArchive={this.setArchive}
                      setTrash={this.setTrash}
                      title={this.state.componentTitle}
                      openCollaboratorDialog={this.state.openCollaboratorDialog}
                      note={this.props.note}
                      labels={this.props.labels}
                      closeCollaboratorDialog={this.closeCollaboratorDialog}
                      setAddCollaborator={this.setAddCollaborator}
                      removeCollaborator={this.removeCollaborator}
                      getReminder={this.getReminderData}
                    />
                  )}
                  <Button onClick={this.editNote} color="primary">
                    Close
                  </Button>
                </div>
              </DialogActions>
            </Paper>
            {this.state.openCollaboratorDialog === true && (
              <CollaboartorDialog
                openCollaboratorDialog={this.state.openCollaboratorDialog}
                note={this.props.note}
                closeCollaboratorDialog={this.closeCollaboratorDialog}
                title={this.state.componentTitle}
                setAddCollaborator={this.setAddCollaborator}
                removeCollaborator={this.removeCollaborator}
              />
            )}
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default EditNoteDialog;
