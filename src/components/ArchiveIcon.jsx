import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import archiveIcon from "../assets/archive.svg";

export class ArchiveIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: false,
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.archiveIcon === "Archive") {
      this.setState({
        archive: true,
      });
    } else {
      this.setState({
        archive: false,
      });
    }
  }

  render() {
    return (
      <div>
        {/* {this.props.archiveIcon ? ( */}
        {this.state.archive ? (
          <IconButton onClick={(event) => this.props.setUnarchive(event)}>
            <img
              src={require("../assets/unarchive.svg")}
              alt="unarchive_icon"
            />
          </IconButton>
        ) : (
          <IconButton onClick={(event) => this.props.setArchive(event)}>
            <img src={require("../assets/archive.svg")} alt="archive" />
            {/* src={archiveIcon} */}
          </IconButton>
        )}
      </div>
    );
  }
}

export default ArchiveIcon;
