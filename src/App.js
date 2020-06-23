import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/layout";
import Home from "./containers/Home/home.component";
import SignUp from "./containers/Auth/Signup/signup.component";
import Profile from "./containers/UserProfile/user-profile.component";
import Logout from "./containers/Auth/Logout/logout.component";
import Login from "./containers/Auth/Login/login.component";
import EditProfile from "./containers/UserProfile/EditProfile/edit-profile.component";
import OtherPersonProfile from "./components/OtherPersonProfile/other-person-profile.component";
class App extends React.Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />

        <Route path="/logout" component={Logout} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/profile/:id" component={OtherPersonProfile} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(App);
