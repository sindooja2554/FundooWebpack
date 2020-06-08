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

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.match.params.value,
      search: [],
      getAllLabels: [],
    };
  }

  // setState = () => {
  //   this.setState({
  //     value: this.props.match.params.value,
  //   });
  //   this.search();
  // };

  search = () => {
    this.setState({
      value: this.props.match.params.value,
    });
    let request = {
      value: this.props.match.params.value,
    };
    console.log("in func", this.props.match.params.value, request);
    Service.search(request)
      .then((data) => {
        this.setState({
          search: data.data.data,
        });
        console.log("in func after up", this.state.search);
      })
      .catch((error) => {
        console.log(error);
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
    let count = 0;
    if (this.props.match.params.value !== this.state.value) {
      count++;
      if (count === 1) {
        console.log(
          "88888888888888888888888",
          this.state.search[0],
          this.props.match.params.value
        );
        this.state.search.pop();
        this.setState({
          value: this.props.match.params.value,
          search: this.state.search,
        });
        console.log("99999999999999999999999", this.state.search[0]);
        console.log(
          "states",
          this.state.value,
          "params",
          this.props.match.params.value
        );
        this.search();
        this.getAllLabels();
      }
    }
  }

  UNSAFE_componentWillMount() {
    this.setState({
      value: this.props.match.params.value,
    });
    this.search();
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
            {this.state.search.length > 0 && (
              <div className="deleteDisplay">
                {this.state.search.map((item, index) => (
                  <div key={index} className="displayDiv">
                    <DisplayNote
                      note={item}
                      view={this.props.view}
                      getAllNotes={this.search}
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

export default connect(mapStateToProps)(Search);
