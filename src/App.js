import React from "react";

import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout/layout";
import Home from "./containers/Home/home.component";
import SignUp from "./containers/Auth/Signup/signup.component";
import Profile from "./containers/UserProfile/user-profile.component";
import Logout from "./containers/Auth/Logout/logout.component";
import Login from "./containers/Auth/Login/login.component";
import EditProfile from "./containers/UserProfile/EditProfile/edit-profile.component";
class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
