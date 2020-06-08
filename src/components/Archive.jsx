import React, { Component } from "react";
import DisplayNote from "./DisplayNote";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import { connect } from "react-redux";
import "../scss/NoteCard.scss";
import "../scss/Dashboard.scss";
const Service = require("../services/service");

const mapStateToProps = (state) => {
  return {
    open: state.openDrawer.open,
    view: state.view.view,
  };
};

export class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAllArchive: [],
      getAllLabels: [],
      archiveLength: 0,
      title: "Archive",
    };
  }

  getAllArchive = () => {
    let archiveCount = 0;
    this.setState({
      getAllArchive: [],
    });
    Service.getAllNotes((error, data) => {
      if (error) {
        console.log(error);
      } else {
        let array = data.data.data.reverse();
        array.forEach((element) => {
          if (element.isArchive === true && element.isTrash !== true) {
            archiveCount++;
            this.state.getAllArchive.push(element);
            this.setState({
              archiveLength: archiveCount,
            });
          }
        });
      }
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

  UNSAFE_componentWillMount() {
    this.getAllArchive();
    this.getAllLabels();
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
            {this.state.archiveLength > 0 && (
              <div className="deleteDisplay">
                {this.state.getAllArchive.map((item, index) => (
                  <div key={index} className="displayDiv">
                    <DisplayNote
                      note={item}
                      view={this.props.view}
                      archive={this.state.title}
                      getAllNotes={this.getAllArchive}
                      labels={this.state.getAllLabels}
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

export default connect(mapStateToProps)(Archive);
