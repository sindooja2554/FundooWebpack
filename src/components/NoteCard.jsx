import React, { Component } from "react";
import CreateNote from "./CreateNote";
import DisplayNote from "./DisplayNote";
import "../scss/NoteCard.scss";
import { connect } from "react-redux";

const Service = require("../services/service");

const mapStateToProps = (state) => {
  return {
    open: state.openDrawer.open,
    view: state.view.view,
  };
};

export class NoteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAllNotes: [],
      getAllPinned: [],
      getAllLabels: [],
      noteLength: 0,
      pinLength: 0,
      openCreateNote: false,
      dragged: null,
    };
  }

  handleCreateNote = (event) => {
    this.setState({
      openCreateNote: !this.state.openCreateNote,
    });
  };

  getAllNotes = () => {
    this.setState({
      getAllNotes: [],
      getAllPinned: [],
    });
    Service.getAllNotes((error, data) => {
      if (error) {
        console.log("error------------->", error, data);
      } else {
        let noteCount = 0;
        let pinCount = 0;
        let array = data.data.data.reverse();
        array.forEach((element) => {
          if (element.isPinned !== false && element.isTrash !== true) {
            pinCount++;
            this.state.getAllPinned.push(element);
          } else if (element.isArchive !== true && element.isTrash !== true) {
            noteCount++;
            this.state.getAllNotes.push(element);
          }
        });
        this.setState({
          pinLength: pinCount,
          noteLength: noteCount,
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

  handleDragStart = (e, note) => {
    e.dataTransfer.setData("text/plain", note._id);
    console.log("note is ", note.isPinned);
    if (note.isPinned === true) {
      this.setState({
        dragged: "pinnedArray",
      });
    } else {
      this.setState({
        dragged: "notes",
      });
    }
  };

  onDrop = (e, index) => {
    let note = e.dataTransfer.getData("text");
    let temp;
    let noteArray = [];
    if (this.state.dragged === "pinnedArray") {
      noteArray = this.state.getAllPinned;
    } else if (this.state.dragged === "notes") {
      noteArray = this.state.getAllNotes;
    }
    for (let i = 0; i < noteArray.length; i++) {
      if (noteArray[i]._id === note) {
        temp = noteArray[index];
        noteArray[index] = noteArray[i];
        noteArray[i] = temp;
        break;
      }
    }
    if (this.state.dragged === "pinnedArray") {
      this.setState({
        getAllPinned: noteArray,
      });
    } else {
      this.setState({
        getAllNotes: noteArray,
      });
    }
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
    this.getAllLabels();
  }

  render() {
    return (
      <div className="noteCard">
        <CreateNote
          handleToggle={this.handleCreateNote}
          openNoteEditor={this.state.openCreateNote}
          getAllNotes={this.getAllNotes}
          labels={this.state.getAllLabels}
          props={this.props}
        />
        {/* handleToggle={this.props.handleToggle}
          openNoteEditor={this.props.openCreateNote} */}
        {this.state.pinLength > 0 && (
          <div className="label">
            <span>PINNED</span>
          </div>
        )}
        <div className="noteDisplay">
          {this.state.pinLength > 0 && (
            <div className="notesDisplay">
              {this.state.getAllPinned.map((item, index) => (
                <div
                  key={index}
                  className="displayDiv"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => this.onDrop(e, index)}
                >
                  <DisplayNote
                    handleDragStart={this.handleDragStart}
                    note={item}
                    getAllNotes={this.getAllNotes}
                    view={this.props.view}
                    labels={this.state.getAllLabels}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {this.state.pinLength > 0 && this.state.noteLength > 0 && (
          <div className="label">
            <span>OTHERS</span>
          </div>
        )}

        {this.state.noteLength > 0 && (
          <div className="noteDisplay">
            <div className="notesDisplay">
              {this.state.getAllNotes.map((item, index) => (
                <div
                  key={index}
                  className="displayDiv"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => this.onDrop(e, index)}
                >
                  <DisplayNote
                    handleDragStart={this.handleDragStart}
                    note={item}
                    getAllNotes={this.getAllNotes}
                    view={this.props.view}
                    labels={this.state.getAllLabels}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(NoteCard);
