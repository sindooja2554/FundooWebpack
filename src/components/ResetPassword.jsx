import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import Fundoo from "./Fundoo";
import "../scss/Reset.scss";
const Service = require("../services/service");

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        width: "350px",
        height: "fit-content",
      },
    },
    MuiInputBase: {
      input: {
        box: { shadow: "none" },
        width: "100%",
      },
    },
    MuiButton: {
      containedPrimary: {
        color: "#fff",
        backgroundColor: "#287AE6",
      },
    },
  },
});

var passwordPattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
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
    if (!passwordPattern.test(this.state.password)) {
      alert("Password fields are invalid");
      return;
    } else {
      console.log("values in state-------------->", this.state);
      let request = {
        token: this.props.match.params.token,
        password: this.state.password,
      };
      Service.reset(request, (error, data) => {
        if (error) {
          console.log("Error", error);
        } else {
          console.log("data", data);
          this.props.history.push("/login");
        }
      });
    }
  }

  render() {
    return (
      <div className="resetMain">
        <MuiThemeProvider theme={theme}>
          <Card>
            <Fundoo />
            <div className="reset">
              <b>
                <span className="reset-password">Reset Password</span>
              </b>
            </div>
            <form noValidate autoComplete="off">
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
                <IconButton onClick={(event) => this.showPassword(event)}>
                  {this.state.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>
              <div className="resetpassword">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => this.submit(event)}
                >
                  Reset Password
                </Button>
              </div>
            </form>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ResetPassword;
