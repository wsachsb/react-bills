import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DashboardMainDashboard from "./pages/Dashboard/Main/Dashboard";
import MonthlyList from "./pages/MonthlyBase/MonthyList";
import Monthly from "./pages/MonthlyBase/Monthy";
import balance from "./pages/Dashboard/Main/Dashboard";
import expenses from "./pages/Dashboard/Main/Dashboard";
import revenues from "./pages/Dashboard/Main/Dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <PrivateRoute path="/dashboard" component={DashboardMainDashboard} />
      <PrivateRoute path="/monthlylist" component={MonthlyList} />
      <PrivateRoute path="/monthly/:id" component={Monthly} />
      <PrivateRoute path="/balance" component={balance} />
      <PrivateRoute path="/expenses" component={expenses} />
      <PrivateRoute path="/revenues" component={revenues} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
