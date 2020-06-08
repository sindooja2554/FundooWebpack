import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Checkbox from "@material-ui/core/Checkbox";
import "../scss/NoteIcon.scss";
const Service = require("../services/service");

export class LabelPopper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelName: "",
      noteLabels: [],
    };
  }

  focusInput = (component) => {
    if (component) {
      component.focus();
    }
  };

  changeValue = (event) => {
    this.setState({
      labelName: event.target.value,
    });
  };

  createLabel = () => {
    if (this.props.title !== undefined) {
      let item = {
        label: this.state.labelName,
      };
      this.props.createLabels(item);
    } else {
      let request = {
        _id: this.props.note._id,
        label: this.state.labelName,
      };
      Service.addLabelToNote(request)
        .then((data) => {
          console.log("datatata--------------------->", data);
          this.setState({
            labelName: "",
          });
          this.props.handleClose();
        })
        .catch((error) => {
          console.log("errorrrrrrrr--------------------->", error);
        });
    }
  };

  handleChecked = (event, item) => {
    if (this.props.title !== undefined && this.props.title !== "EditNote") {
      this.props.handleChecked(event, item);
    } else {
      if (event.target.checked === true) {
        let request = {
          _id: this.props.note._id,
          label: item.label,
          labelId: item._id,
        };
        Service.addLabelToNote(request)
          .then((data) => {
            console.log("datatata--------------------->", data);
          })
          .catch((error) => {
            console.log("errorrrrrrrr--------------------->", error);
          });
      } else {
        let request = {
          _id: this.props.note._id,
          label: item.label,
          labelId: item._id,
        };
        for (let i = 0; i < this.state.noteLabels.length; i++) {
          if (this.state.noteLabels[i]._id === item._id) {
            console.log("-------->", this.state.noteLabels[i]._id === item._id);

            this.state.noteLabels.splice(i, 1);
          }
        }
        Service.removeLabelFromNote(request)
          .then((data) => {
            console.log("datatata--------------------->", data);
          })
          .catch((error) => {
            console.log("errorrrrrrrr--------------------->", error);
          });
      }
    }
  };

  UNSAFE_componentWillMount() {
    if (this.props.note !== undefined) {
      this.setState({
        noteLabels: this.props.note.labels,
      });
    } else if (
      this.props.noteLabels !== undefined ||
      this.props.noteLabels !== null
    ) {
      this.setState({
        noteLabels: this.props.noteLabels,
      });
    }
    console.log("000000000", this.props.labels);
  }

  render() {
    return (
      <div>
        <ClickAwayListener onClickAway={this.props.handleClose}>
          <Popper
            className="pop"
            open={this.props.openlabelPopper}
            anchorEl={this.props.anchorEl}
            placement={this.props.placement}
          >
            <List>
              <ListSubheader>Label note</ListSubheader>
              <ListItem>
                <input
                  id="input"
                  value={this.state.labelName}
                  ref={this.focusInput}
                  onChange={(event) => {
                    this.changeValue(event);
                  }}
                  autoFocus
                  placeholder="Create new label"
                />
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
              </ListItem>
              {this.props.labels.map((item, index) => (
                <div key={index}>
                  <ListItem>
                    <Checkbox
                      checked={this.state.noteLabels.find(
                        (choice) => choice._id === item._id
                      )}
                      color="default"
                      inputProps={{
                        "aria-label": "checkbox with default color",
                      }}
                      onChange={(event) => this.handleChecked(event, item)}
                    />
                    <ListItemText>{item.label}</ListItemText>
                  </ListItem>
                </div>
              ))}
              <ListItem button onClick={() => this.createLabel()}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText>Create {this.state.labelName}</ListItemText>
              </ListItem>
            </List>
          </Popper>
        </ClickAwayListener>
      </div>
    );
  }
}

export default LabelPopper;
