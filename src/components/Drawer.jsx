import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import EditLabelDialog from "./EditLabelDialog";
import "../scss/Dashboard.scss";
const Service = require("../services/service");

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        top: "none",
        width: "270px",
        height: "90%",
        "overflow-y": "auto",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "white",
      },
    },
    // MuiListItem: {
    //   button: {
    //     "border-top-right-radius": "30px",
    //     "border-bottom-right-radius": "30px",
    //   },
    // },
  },
});

export class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditLabel: false,
      notes: false,
      edit: false,
      reminder: false,
      archive: false,
      trash: false,
      getAllLabels: [],
    };
  }

  handleNote = () => {
    this.setState({
      notes: true,
      edit: false,
      reminder: false,
      archive: false,
      trash: false,
    });
    this.props.props.history.push("/dashboard");
  };

  handleReminder = () => {
    this.setState({
      notes: false,
      edit: false,
      reminder: true,
      archive: false,
      trash: false,
    });
    this.props.props.history.push("/dashboard/reminder");
  };

  handleArchive = () => {
    this.setState({
      notes: false,
      edit: false,
      reminder: false,
      archive: true,
      trash: false,
    });
    this.props.props.history.push("/dashboard/archive");
  };

  handleTrash = () => {
    this.setState({
      notes: false,
      edit: false,
      reminder: false,
      archive: false,
      trash: true,
    });
    this.props.props.history.push("/dashboard/trash");
  };

  handleLabel = (item) => {
    this.props.props.history.push("/dashboard/label/" + item.label);
  };

  handleEditLabels = () => {
    this.setState({
      notes: false,
      edit: true,
      reminder: false,
      archive: false,
      trash: false,
      openEditLabel: !this.state.openEditLabel,
    });
  };

  handleEditLabelsClose = () => {
    this.setState({
      openEditLabel: !this.state.openEditLabel,
    });
  };

  getAllLabels = () => {
    this.setState({
      getAllLabels: [],
    });
    Service.getAllLabels()
      .then((data) => {
        this.setState({
          getAllLabels: data.data.data,
        });
      })
      .catch((error) => {
        console.log("error---------->", error);
      });
  };

  UNSAFE_componentWillMount() {
    this.getAllLabels();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Drawer variant="persistent" open={this.props.getValue}>
            <List>
              <ListItem
                className={this.state.notes ? "buttonBackground" : null}
                button
                onClick={this.handleNote}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Notes" />
              </ListItem>
              <Divider />
              <ListItem
                className={this.state.reminder ? "buttonBackground" : null}
                button
                onClick={this.handleReminder}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Reminder" />
              </ListItem>
              <Divider />
              {this.state.getAllLabels.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => this.handleLabel(item)}
                >
                  <ListItemIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
                // <Divider> </Divider>
              ))}
              <ListItem
                className={this.state.edit ? "buttonBackground" : null}
                button
                onClick={this.handleEditLabels}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Edit Labels" />
              </ListItem>
              <Divider />
              <ListItem
                className={this.state.archive ? "buttonBackground" : null}
                button
                onClick={this.handleArchive}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Archive" />
              </ListItem>
              <Divider />
              <ListItem
                className={this.state.trash ? "buttonBackground" : null}
                button
                onClick={this.handleTrash}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                    <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItem>
              <Divider />
              {this.state.openEditLabel === true && (
                <EditLabelDialog
                  getLabels={this.state.getAllLabels}
                  openEditLabel={this.state.openEditLabel}
                  getAllLabels={this.getAllLabels}
                  handleEditLabelsClose={this.handleEditLabelsClose}
                />
              )}
            </List>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default DrawerMenu;
