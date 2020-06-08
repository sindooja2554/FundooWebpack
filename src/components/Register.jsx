import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import Fundoo from "./Fundoo";
import "../scss/Register.scss";
import "../index.css";
const Service = require("../services/service");

var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim,
  passwordPattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/,
  namePattern = /^[A-Za-z]{3,30}$/;

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        width: "65%",
        height: "fit-content",
        display: "flex",
      },
    },
    MuiInputBase: {
      input: {
        box: { shadow: "none" },
        width: "140px",
      },
    },
    MuiButton: {
      contained: {
        color: "#287AE6",
        box: {
          shadow:
            " 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        },
        backgroundColor: "white",
      },
      containedPrimary: {
        color: "#fff",
        backgroundColor: "#287AE6",
      },
    },
    MuiFormControl: {
      root: {
        width: "95%",
      },
    },
  },
});

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      show: false,
    };
  }

  input = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  showPassword(event) {
    this.setState({
      show: !this.state.show,
    });
  }

  submit(event) {
    if (
      !emailPattern.test(this.state.email) ||
      !passwordPattern.test(this.state.password) ||
      !namePattern.test(this.state.firstName) ||
      !namePattern.test(this.state.lastName)
    ) {
      alert("First name or last name or email or password fields are invalid");
      return;
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        password: "",
        confirmPassword: "",
      });
      alert("Passwords do not match");
      return;
    } else {
      console.log("values in state-------------->", this.state);
      let request = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      };
      Service.register(request, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          this.props.history.push("/");
        }
      });
    }
  }

  render() {
    return (
      <div className="registerMain">
        <MuiThemeProvider theme={theme}>
          <Card>
            <div className="left-section">
              <Fundoo />
              <div className="signUp">
                <b>
                  <span className="sign-up">Create your Google Account</span>
                </b>
              </div>
              <div className="signUp">
                <span className="sign-up">Continue to Gmail</span>
              </div>
              <form noValidate autoComplete="off">
                <div className="name">
                  <div className="names">
                    <TextField
                      required
                      id="outlined-required"
                      label="FirstName"
                      name="firstName"
                      variant="outlined"
                      value={this.state.firstName}
                      onChange={(event) => this.input(event)}
                    />
                  </div>
                  <br />
                  <div className="names">
                    <TextField
                      required
                      id="outlined-required"
                      label="LastName"
                      name="lastName"
                      variant="outlined"
                      value={this.state.lastName}
                      onChange={(event) => this.input(event)}
                    />
                  </div>
                </div>
                {/* <br /> */}
                <div className="email">
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={this.state.email}
                    onChange={(event) => this.input(event)}
                  />
                </div>
                <div className="signUp">
                  <span className="dailogue">
                    You can use letters, numbers & periods
                  </span>
                </div>
                <div className="name">
                  <div className="password">
                    <TextField
                      required
                      id="outlined-password-input"
                      label="Password"
                      name="password"
                      type={this.state.show ? "text" : "password"}
                      autoComplete="current-password"
                      variant="outlined"
                      value={this.state.password}
                      onChange={(event) => this.input(event)}
                    />
                  </div>
                  <br />
                  <div className="password">
                    <TextField
                      required
                      id="outlined-password-input"
                      label="Confirm Password"
                      name="confirmPassword"
                      type={this.state.show ? "text" : "password"}
                      autoComplete="current-password"
                      variant="outlined"
                      value={this.state.confirmPassword}
                      onChange={(event) => this.input(event)}
                    />
                  </div>
                  <div className="showPassword">
                    <IconButton onClick={(event) => this.showPassword(event)}>
                      {this.state.show ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </div>
                </div>
                <div className="signUp">
                  <span className="dailogue">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols
                  </span>
                </div>
                <div className="login">
                  <Button variant="contained" href="/">
                    Sign In Instead
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.submit(event)}
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
            <div className="right-section">
              <div className="fundoo-account">
                <img
                  className="account"
                  src={require("../assets/account.svg")}
                  alt="account"
                />
                {/* src={require("!!file-loader!account.svg")} */}
                <span className="showPassword">
                  One account. All of Fundoo working for you
                </span>
              </div>
            </div>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Register;
