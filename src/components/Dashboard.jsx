import React, { Component } from "react";
import { connect } from "react-redux";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import NoteCard from "./NoteCard";
import "../scss/Dashboard.scss";

const mapStateToProps = (state) => {
  console.log("state in dashboard------>", state);
  return {
    open: state.openDrawer.open,
  };
};

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateNote: false,
      getAllLabels: [],
      view: false,
    };
  }

  handleCreateNote = (event) => {
    this.setState({
      openCreateNote: !this.state.openCreateNote,
    });
  };

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
          <div className={this.props.open ? "Note" : "Notes"}>
            <NoteCard view={this.state.view} props={this.props} />
            {/* handleToggle={this.handleCreateNote}
              openNoteEditor={this.state.openCreateNote} */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
