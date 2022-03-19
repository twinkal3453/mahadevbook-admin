import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login/Login";
import Sidebar from "./routes/Sidebar/Sidebar";
import UserRoute from "./auth/UserRoute";

function App() {
  return (
    <Router basename="admin">
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login} />
          <UserRoute path="/" exect component={Sidebar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
