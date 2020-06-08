import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/VerfiyUser";
import Forgot from "./components/ForgotPassword";
import Reset from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Reminder from "./components/Reminder";
import Archive from "./components/Archive";
import Trash from "./components/Trash";
import Label from "./components/Label";
import Search from "./components/Search";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      {/* A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. */}
      <Router>
        {/* To provide the redux store to react component 
        react-redux exports a component as Provider. 
        But how does the provider component known about 
        the redux store so that we need to provide as props*/}
        <Provider store={store}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/reset/:token" exact component={Reset} />
            <Route path="/verify/:token" exact component={Verify} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute
              path="/dashboard/reminder"
              exact
              component={Reminder}
            />
            <PrivateRoute path="/dashboard/archive" exact component={Archive} />
            <PrivateRoute path="/dashboard/trash" exact component={Trash} />
            <PrivateRoute
              path="/dashboard/label/:key"
              exact
              component={Label}
            />
            <PrivateRoute
              path="/dashboard/search/:value"
              exact
              component={Search}
            />
            <Route component={Login} />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
