import React from "react";
import AddBioBox from "./AddBioBox/add-bio-box.component";
import AddNewBio from "../../../../../containers/UserProfile/AddMainContent/AddNewBio/add-new-bio.component";
import classes from "./bio.module.css";
import { Route, Switch, withRouter } from "react-router-dom";
const bio = props => {
  let newBio = (
    <Switch>
      <Route path={props.match.url + "/add-new-bio"} component={AddNewBio} />
      <Route path={props.match.url} component={AddBioBox} />
    </Switch>
  );
  return (
    <div className={classes.Content}>
      {props.data ? (
        <p style={{ textAlign: "center", color: "#333" }}>{props.data}</p>
      ) : (
        newBio
      )}
    </div>
  );
};

export default withRouter(bio);
