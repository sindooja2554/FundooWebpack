import React, { Component } from "react";
import { connect } from "react-redux";
import CreateNote from "./CreateNote";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import DisplayNote from "./DisplayNote";
import "../scss/NoteCard.scss";
import "../scss/Dashboard.scss";
const Service = require("../services/service");

const mapStateToProps = (state) => {
  return {
    open: state.openDrawer.open,
    view: state.view.view,
  };
};

export class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateNote: false,
      getAllReminder: [],
      getAllLabels: [],
      from: "reminder",
    };
  }

  getAllReminders = () => {
    console.log("called");
    this.setState({
      getAllReminder: [],
    });
    Service.getAllNotes((error, data) => {
      if (error) {
        console.log(error);
      } else {
        data.data.data.forEach((element) => {
          if (element.isTrash !== true && element.remainder !== null) {
            this.state.getAllReminder.push(element);
          }
        });
      }
      this.setState({
        getAllReminders: this.state.getAllReminder,
      });
    });
  };

  getAllLabels = () => {
    this.setState({
      getAllLabels: [],
    });
    Service.getAllLabels().then((data) => {
      this.setState({
        getAllLabels: data.data.data,
      });
    });
  };

  handleCreateNote = (event) => {
    this.setState({
      openCreateNote: !this.state.openCreateNote,
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllReminders();
    this.getAllLabels();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="appbar">
          <Appbar props={this.props} />
        </div>
        <div className="drawer-create-note">
          <div className={this.props.open ? "drawer" : "drawers"}>
            <Drawer getValue={this.props.open} props={this.props} />
          </div>
          <div className={this.props.open ? "outerDrawer" : "outerDrawers"}>
            <div className="hold">
              <div className="create-note-label">
                <CreateNote
                  handleToggle={this.handleCreateNote}
                  openNoteEditor={this.state.openCreateNote}
                  title={this.state.from}
                  props={this.props}
                  labels={this.state.getAllLabels}
                  getAllNotes={this.getAllReminders}
                />
              </div>
              <div className="labelDisplay">
                {this.state.getAllReminder.length === 0 ? null : (
                  <div className="deleteDisplay">
                    {this.state.getAllReminder.map((item, index) => (
                      <div key={index} className="displayDiv">
                        <DisplayNote
                          note={item}
                          view={this.props.view}
                          getAllNotes={this.getAllReminders}
                          labels={this.state.getAllLabels}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Reminder);
