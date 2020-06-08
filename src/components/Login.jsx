import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Fundoo from "./Fundoo";
import "../scss/Login.scss";
import "../index.css";
const Service = require("../services/service");

var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim,
  passwordPattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;

const colorArray = [
  "#164D40",
  "#C2185B",
  "#0569F9",
  "#AB05F9",
  "#F9055E",
  "#F9A005",
  "#900C3F",
  "#FF5733",
  "#6105F9",
  "#F94F05",
];

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        width: "400px",
        height: "fit-content",
      },
    },
    MuiInputBase: {
      input: {
        box: { shadow: "none" },
        width: "350px",
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
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      profileColor: "",
    };
  }

  input = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submit(event) {
    if (
      !emailPattern.test(this.state.email) ||
      !passwordPattern.test(this.state.password)
    ) {
      alert("Email or password fields are invalid");
      return;
    } else {
      let random = Math.floor(Math.random() * (+10 - +1) + +1);
      this.setState({
        profileColor: colorArray[random],
      });
      console.log("values in state-------------->", this.state);
      let request = {
        email: this.state.email,
        password: this.state.password,
      };

      Service.login(request, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          var firstLetter =
            data.data.data.data.firstName + " " + data.data.data.data.lastName;
          sessionStorage.setItem("token", data.data.token);
          sessionStorage.setItem("imageUrl", data.data.data.data.imageUrl);
          sessionStorage.setItem("email", data.data.data.data.email);
          sessionStorage.setItem("firstName", firstLetter);
          sessionStorage.setItem("profileColor", this.state.profileColor);
          this.props.history.push("/dashboard");
        }
      });
    }
  }

  render() {
    return (
      <div className="loginMain">
        <MuiThemeProvider theme={theme}>
          <Card>
            <Fundoo />
            <div className="signIn">
              <b>
                <span className="sign-in">Sign In</span>
              </b>
            </div>
            <div className="signIn">
              <span className="sign-in">Continue to Gmail</span>
            </div>
            <form noValidate autoComplete="off">
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
              <br />
              <div className="email">
                <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={this.state.password}
                  onChange={(event) => this.input(event)}
                />
              </div>
              <div className="forgot">
                <a className="Link" href="/forgot">
                  Forgot password?
                </a>
              </div>
              <div className="login">
                <Button variant="contained" href="/register">
                  Create Account
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => this.submit(event)}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
