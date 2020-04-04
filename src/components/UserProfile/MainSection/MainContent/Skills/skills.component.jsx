import React from "react";
import AddSkillsBox from "./AddSkillsBox/add-skills-box.component";
import AddNewSKill from "../../../../../containers/UserProfile/AddMainContent/AddNewSkill/add-new-skill.component";
import classes from "./skills.module.css";
import { Route, Switch, withRouter } from "react-router-dom";
const skills = props => {
  let newSkill = (
    <Switch>
      <Route
        path={props.match.url + "/add-new-skill"}
        component={AddNewSKill}
      />
      <Route path={props.match.url} component={AddSkillsBox} />
    </Switch>
  );
  return (
    <div className={classes.Content}>
      {props.data.length !== 0 ? (
        <p style={{ textAlign: "center", color: "#333" }}>
          {props.data.join(", ")}
        </p>
      ) : (
        newSkill
      )}
    </div>
  );
};

export default withRouter(skills);
