import React from "react";

import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout/layout";
import Posts from "./containers/Posts/posts.component";
import SignUp from "./containers/Auth/Signup/signup.component";
import Profile from "./containers/UserProfile/user-profile.component";
import Logout from "./containers/Auth/Logout/logout.component";
import Login from "./containers/Auth/Login/login.component";
class App extends React.Component {
  render() {
    return (
      <Switch>
        <Layout>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Posts} />
        </Layout>
      </Switch>
    );
  }
}
export default App;
