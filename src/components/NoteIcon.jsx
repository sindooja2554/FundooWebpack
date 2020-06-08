import React, { Component } from "react";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ReminderIcon from "./ReminderIcon";
import CollaboratorIcon from "./CollaboratorIcon";
import ColorIcon from "./ColorIcon";
import ArchiveIcon from "./ArchiveIcon";
import MoreIcon from "./MoreIcon";
import ColorPopper from "./ColorPopper";
import MoreMenu from "./MoreMenuPopper";
import ReminderPopper from "./RemindPopper";
import LabelPopper from "./LabelPopper";
import CollaboartorDialog from "./CollaboratorDialog";
import "../scss/NoteIcon.scss";

export class NoteIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCollaboratorDialog: false,
      openColorPopper: false,
      openMenuPopper: false,
      openRemindPopper: false,
      openLabelsPopper: false,
      archive: false,
      placement: null,
      anchorEl: null,
    };
  }

  handleClickAway = () => {
    this.setState({
      openMenuPopper: false,
      openColorPopper: false,
    });
  };

  handleClose = () => {
    this.setState({
      openMenuPopper: false,
      openColorPopper: false,
      openLabelsPopper: false,
      openRemindPopper: false,
      anchorEl: null,
      placement: null,
    });
    if (this.props.title === undefined) {
      this.props.getAllNotes();
    }
  };

  changeColour = (event) => {
    this.setState({
      openColorPopper: !this.state.openColorPopper,
      anchorEl: event.currentTarget,
    });
  };

  closeColourPopper = () => {
    this.setState({
      openColorPopper: false,
      anchorEl: null,
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
    if (this.props.title === undefined) {
      this.props.getAllNotes();
    }
  };

  loadColor = (element) => {
    this.props.getColor(element);
  };

  changeArchive = (event) => {
    this.setState({
      archive: !this.state.archive,
    });
    this.props.getArchive(event);
    this.props.setArchive(event);
  };

  openMoreMenuPopper = (event) => {
    console.log("event----------->", event.currentTarget);
    this.setState({
      openMenuPopper: !this.state.openMenuPopper,
      anchorEl: event.currentTarget,
    });
  };

  openRemindPopper = (event) => {
    this.setState({
      openRemindPopper: !this.state.openRemindPopper,
      anchorEl: event.currentTarget,
    });
  };

  closeReminder = () => {
    this.setState({
      openRemindPopper: !this.state.openRemindPopper,
      anchorEl: null,
    });
  };

  getData = (date, time) => {
    this.props.getReminder(date, time);
  };

  labels = (event) => {
    console.log("labels----------->", this.state.anchorEl);
    this.handleClickAway();
    this.setState({
      openLabelsPopper: !this.state.openLabelsPopper,
      // anchorEl: event.currentTarget,
      placement: "bottom-start",
    });
  };

  UNSAFE_componentWillMount() {
    if (this.props.title === "Create_Note") {
      console.log("99999999999", this.props.labels);
    }
  }

  render() {
    return (
      <div>
        {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
        <div className="note_icons">
          <ReminderIcon setReminder={this.openRemindPopper} />

          <CollaboratorIcon collaborator={this.setCollaborator} />

          <ColorIcon setColor={this.changeColour} />
          {/* {this.state.openColorPopper === true && ( */}

          {/* )} */}

          <ArchiveIcon
            archiveIcon={this.props.archive}
            archive={this.state.archive}
            setArchive={this.changeArchive}
            setUnarchive={this.props.setUnarchive}
          />
          <MoreIcon setMore={this.openMoreMenuPopper} />
        </div>
        {/* </ClickAwayListener> */}
        <ReminderPopper
          openRemindPopper={this.state.openRemindPopper}
          anchorEl={this.state.anchorEl}
          itle={this.props.title}
          getReminder={this.getData}
          close={this.closeReminder}
        />
        {this.state.openCollaboratorDialog === true && (
          <CollaboartorDialog
            openCollaboratorDialog={this.state.openCollaboratorDialog}
            note={this.props.note}
            title={this.props.title}
            closeCollaboratorDialog={this.closeCollaboratorDialog}
            setAddCollaborator={this.props.setAddCollaborator}
            removeCollaborator={this.props.removeCollaborator}
          />
        )}
        <ColorPopper
          openColorPopper={this.state.openColorPopper}
          anchorEl={this.state.anchorEl}
          closeColourPopper={this.closeColourPopper}
          props={this.loadColor}
        />
        {this.state.openMenuPopper === true && (
          <MoreMenu
            title={this.props.title}
            setTrash={this.props.setTrash}
            openMenuPopper={this.state.openMenuPopper}
            anchorEl={this.state.anchorEl}
            handleClose={this.handleClickAway}
            labels={this.labels}
          />
        )}
        {this.state.openLabelsPopper === true && (
          <div className="labelPopper">
            <LabelPopper
              openlabelPopper={this.state.openLabelsPopper}
              placement={this.state.placement}
              anchorEl={this.state.anchorEl}
              labels={this.props.labels}
              handleClose={this.handleClose}
              title={this.props.title}
              note={this.props.note}
              noteLabels={this.props.noteLabels}
              handleChecked={this.props.handleChecked}
              createLabels={this.props.createLabels}
            />
          </div>
        )}
      </div>
    );
  }
}

export default NoteIcon;
