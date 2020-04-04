import React from "react";
import AddEducationBox from "./AddEducationBox/add-education-box.component";
import AddNewEducation from "../../../../../containers/UserProfile/AddMainContent/AddNewEducation/add-new-education.component";
import classes from "./education.module.css";
import EducationCard from "./EducationCard/education-card.component";
import { Route, Switch, withRouter } from "react-router-dom";

const education = (props) => {
  let newEducation = (
    <Switch>
      <Route
        path={props.match.url + "/add-new-education"}
        component={AddNewEducation}
      />
      <Route path={props.match.url} component={AddEducationBox} />
    </Switch>
  );
  let education = props.data.map((ed) => {
    return <EducationCard key={ed._id} data={ed} />;
  });
  return (
    <div className={classes.Content}>
      {props.data.length !== 0 ? (
        <div className={classes.EducationCard}>{education}</div>
      ) : (
        newEducation
      )}
    </div>
  );
};

export default withRouter(education);
