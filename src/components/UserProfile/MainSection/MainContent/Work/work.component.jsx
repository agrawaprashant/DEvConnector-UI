import React from "react";
import AddWorkBox from "./AddWorkBox/add-work-box.component";
import AddNewWork from "../../../../../containers/UserProfile/AddMainContent/AddNewWork/add-new-work.component";
import WorkExpCard from "./WorkExperienceCard/work-exp-card.component";
import classes from "./work.module.css";
import { Route, Switch, withRouter } from "react-router-dom";
const work = (props) => {
  let newWork = (
    <Switch>
      <Route path={props.match.url + "/add-new-work"} component={AddNewWork} />
      <Route path={props.match.url} component={AddWorkBox} />
    </Switch>
  );
  let work = props.data.map((work) => {
    return <WorkExpCard data={work} />;
  });
  return (
    <div className={classes.Content}>
      {props.data.length !== 0 ? work : newWork}
    </div>
  );
};

export default withRouter(work);
