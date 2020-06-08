import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Fundoo from "./Fundoo";
import "../scss/Forgot.scss";
const Service = require("../services/service");

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        width: "350px",
        height: "fit-content",
      },
    },
  },
});

export class VerfiyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = () => {
    console.log(
      "token from parasms======================",
      this.props.match.params.token
    );
    let request = {
      token: this.props.match.params.token,
      isVerified: true,
    };
    Service.verify(request, (error, data) => {
      if (error) {
        console.log("error------------->", error);
      } else {
        console.log("data-------------->", data);
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return (
      <div className="forgotMain">
        <MuiThemeProvider theme={theme}>
          <Card>
            <Fundoo />
            <div className="forgot">
              <b>
                <span className="forgot-password">Verify Your Email</span>
              </b>
            </div>
            <div className="forget">
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => this.submit(event)}
              >
                Verify
              </Button>
            </div>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default VerfiyUser;
