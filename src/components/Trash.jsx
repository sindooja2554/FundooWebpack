import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayNote from "./DisplayNote";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import "../scss/NoteCard.scss";
import "../scss/Dashboard.scss";
const Service = require("../services/service");

const mapStateToProps = (state) => {
  return {
    open: state.openDrawer.open,
    view: state.view.view,
  };
};

export class Trash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAllTrash: [],
      trashLength: 0,
      openCreateNote: false,
      view: false,
      title: "Trash",
    };
  }

  handleCreateNote = (event) => {
    this.setState({
      openCreateNote: !this.state.openCreateNote,
    });
  };

  showView = () => {
    this.setState({
      view: !this.state.view,
    });
  };

  getAllTrash = () => {
    this.setState({
      getAllTrash: [],
    });
    Service.getAllNotes((error, data) => {
      if (error) {
        console.log("error------------->", error, data);
      } else {
        let trashCount = 0;
        let array = data.data.data.reverse();
        array.forEach((element) => {
          if (element.isTrash === true) {
            trashCount++;
            this.state.getAllTrash.push(element);
          }
        });
        this.setState({
          trashLength: trashCount,
        });
      }
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllTrash();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="appbar">
          <Appbar props={this.props} showView={this.showView} />
        </div>
        <div className="drawer-create-note">
          <div className={this.props.open ? "drawer" : "drawers"}>
            <Drawer getValue={this.props.open} props={this.props} />
          </div>

          <div className={this.props.open ? "display" : "noteDisplay"}>
            {this.state.trashLength > 0 && (
              <div className="deleteDisplay">
                {this.state.getAllTrash.map((item, index) => (
                  <div key={index} className="displayDiv">
                    <DisplayNote
                      note={item}
                      view={this.props.view}
                      trash={this.state.title}
                      getAllNotes={this.getAllTrash}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Trash);
