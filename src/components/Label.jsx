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

export class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAllNotesWithLabels: [],
      title: this.props.match.params.key,
      from: "label",
      labelData: [],
      getAllLabels: [],
      openCreateNote: false,
    };
  }

  getAllNotesWithLabels = () => {
    this.setState({
      title: this.props.match.params.key,
      getAllNotesWithLabels: [],
      from: "label",
    });
    Service.getAllNotes((error, data) => {
      if (error) {
        console.log(error);
      } else {
        let count = 0;
        let length = 0;
        data.data.data.forEach((element) => {
          count++;
          if (element.isTrash !== true && element.labels.length !== 0) {
            element.labels.forEach((key) => {
              if (key.label === this.props.match.params.key) {
                length++;
                if (length === 1) {
                  this.state.labelData.push(key);
                  this.setState({
                    labelData: this.state.labelData,
                  });
                }
                this.state.getAllNotesWithLabels.push(element);
              }
            });
          }
        });
        if (data.data.data.length === count) {
          console.log("length----->", count);
          this.setState({
            getAllNotesWithLabels: this.state.getAllNotesWithLabels,
          });
        }
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

  componentDidUpdate() {
    if (this.props.match.params.key !== this.state.title) {
      console.log("in did ");
      this.state.labelData.pop();
      this.setState({
        labelData: this.state.labelData,
      });
      this.getAllNotesWithLabels();
    }
  }

  handleCreateNote = (event) => {
    this.setState({
      openCreateNote: !this.state.openCreateNote,
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotesWithLabels();
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
                  labelData={this.state.labelData}
                  labels={this.state.getAllLabels}
                  getAllNotes={this.getAllNotesWithLabels}
                />
              </div>
              <div className="labelDisplay">
                {this.state.getAllNotesWithLabels.length === 0 ? null : ( // </div> //   </Avatar> //     /> //       width="50" //       height="50" //       alt="label" //       src={require("../assets/label.svg")} //     <img //   <Avatar variant="square"> // <div className="avatar">
                  <div className="deleteDisplay">
                    {this.state.getAllNotesWithLabels.map((item, index) => (
                      <div key={index} className="displayDiv">
                        <DisplayNote
                          note={item}
                          archive={this.state.title}
                          getAllNotes={this.getAllNotesWithLabels}
                          labels={this.state.getAllLabels}
                          noteLabels={this.state.labelData}
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

export default connect(mapStateToProps)(Label);
