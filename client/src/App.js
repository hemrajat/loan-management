import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Component/Login/Login';
import {EmailPageContainer} from './Component/EmailPage/EmailPage.jsx';
import {OtpPageContainer} from './Component/OtpPage/OtpPage.jsx';
import {DashboardContainer} from './Component/Dashboard/Dashboard.jsx';
import {CreateloanContainer} from './Component/Createloan/Createloan.jsx';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <EmailPageContainer />
        </Route>
        <Route path="/otp">
          <OtpPageContainer />
        </Route>
        <Route path="/dashboard">
          <DashboardContainer />
        </Route>
        <Route path="/createloan">
          <CreateloanContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
