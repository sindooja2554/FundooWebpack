import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { IconButton, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
// import Divider from "@material-ui/core/Divider";
import "../scss/Appbar.scss";
import { openDrawer } from "../redux/openDrawer/openDrawerActions";
import { View } from "../redux/view/viewActions";
import { connect } from "react-redux";
import ProfileUploadDialog from "./ProfileUploadDialog";

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: "black",
        backgroundColor: "white",
      },
    },
    // MuiInputBase: {
    //   root: {
    //     width: "600px",
    //     height: "40px",
    //   },
    // },
    MuiToolbar: {
      regular: {
        display: "flex",
        justifyContent: "space-between",
      },
    },
  },
});

const mapStateToProps = (state) => {
  return {
    open: state.openDrawer.open,
    view: state.view.view,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer()),
    View: () => dispatch(View()),
  };
};

export class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      profileColor: "",
      firstLetter: "",
      imageUrl: null,
      value: "",
      showCancel: false,
      openProfileUploadDialog: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  input = (event) => {
    this.setState({
      showCancel: true,
      [event.target.name]: event.target.value,
    });
  };

  search = () => {
    let value = this.state.value;
    this.setState({
      showCancel: true,
    });
    if (this.state.value.length !== 0) {
      this.props.props.history.push("/dashboard/search/" + value);
    }
  };

  cancel = () => {
    this.setState({
      showCancel: false,
      value: "",
    });
    this.props.props.history.push("/dashboard");
  };

  handleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false,
    });
  };

  handleSignOut = () => {
    sessionStorage.clear();
    this.props.props.history.push("/");
  };

  profilePicture = () => {
    console.log("in the function", !this.state.openProfileUploadDialog);
    this.setState({
      openProfileUploadDialog: !this.state.openProfileUploadDialog,
    });
    // this.handleClose();
  };

  handleProfileDialogClose = () => {
    this.setState({
      openProfileUploadDialog: !this.state.openProfileUploadDialog,
    });
  };

  componentDidUpdate() {
    if (sessionStorage.getItem("imageUrl") !== this.state.imageUrl) {
      console.log("in componentdidupdate");
      this.setState({
        imageUrl: sessionStorage.getItem("imageUrl"),
      });
    }
  }

  UNSAFE_componentWillMount() {
    this.setState({
      profileColor: sessionStorage.getItem("profileColor"),
      firstLetter: sessionStorage.getItem("firstName").charAt(0),
      imageUrl: sessionStorage.getItem("imageUrl"),
    });
  }

  render() {
    return (
      <div className="toolbar">
        <MuiThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <div className="menu-app-icon">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.props.openDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <img src={require("../assets/fundoo.png")} alt="fundoo_icon" />
                <Typography variant="h6" noWrap>
                  Fundoo
                </Typography>
              </div>
              <div className="search">
                <div className="search-icon">
                  <IconButton onClick={() => this.search()}>
                    <SearchIcon />
                  </IconButton>
                </div>
                <div className="search-text">
                  <InputBase
                    autoComplete="off"
                    placeholder="Search…"
                    name="value"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(event) => this.input(event)}
                    fullWidth
                  />
                </div>
                <div className="search-icon">
                  {this.state.showCancel === true && (
                    <IconButton onClick={() => this.cancel()}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </div>
              </div>
              <div className="grid-list">
                <IconButton onClick={this.props.View}>
                  {/* <img src={require("../assets/grid.svg")} alt="" /> */}
                  {this.props.view ? (
                    <img src={require("../assets/grid.svg")} alt="grid-icon" />
                  ) : (
                    <img src={require("../assets/list.svg")} alt="list-icon" />
                  )}
                </IconButton>
              </div>
              <div>
                {this.state.imageUrl ? (
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={(event) => this.handleMenu(event)}
                  >
                    <Avatar alt="Color" src={this.state.imageUrl}></Avatar>
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={(event) => this.handleMenu(event)}
                  >
                    <Avatar
                      alt="Color"
                      style={{ backgroundColor: this.state.profileColor }}
                    >
                      {this.state.firstLetter}
                    </Avatar>
                  </IconButton>
                )}
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <div className="profileAvatar">
                    <Badge
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      color="default"
                      overlap="circle"
                      badgeContent={
                        <CameraAltIcon
                          className="badge"
                          onClick={() => this.profilePicture()}
                        />
                      }
                    >
                      <div className="profile-image">
                        {this.state.imageUrl ? (
                          <img
                            className="profileAvatarImage"
                            src={this.state.imageUrl}
                            alt="profilepicture"
                          />
                        ) : (
                          <div
                            style={{
                              backgroundColor: this.state.profileColor,
                            }}
                            className="profileAvatarImage"
                          >
                            <span className="centered">
                              {" "}
                              {this.state.firstLetter}{" "}
                            </span>
                          </div>
                        )}
                      </div>
                    </Badge>
                  </div>
                  {/* <Divider /> */}
                  <div className="full-name">
                    <span className="ownerName">
                      {sessionStorage.getItem("firstName")}
                    </span>
                  </div>
                  <div className="name">
                    <span className="ownerEmail">
                      {sessionStorage.getItem("email")}
                    </span>
                  </div>
                  {/* <Divider /> */}
                  <div className="signOut">
                    <Button
                      className="signOutButton"
                      onClick={this.handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          {this.state.openProfileUploadDialog === true && (
            <ProfileUploadDialog
              open={this.state.openProfileUploadDialog}
              handleClose={this.handleProfileDialogClose}
            />
          )}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
