import React from "react";
import classes from "./edit-main-content.module.css";
import EditWork from "./EditWork/edit-work.component";
import EditEducation from "./EditEducation/edit-education.component";
import EditSkills from "./EditSkills/edit-skills.component";
import EditBio from "./EditBio/edit-bio.component";

const editMainContent = props => {
  return (
    <div className={classes.UserDetails}>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Technical Skills</h4>
        <div className={classes.BoxContent}>
          <EditSkills data={props.data.skills} />
        </div>
      </div>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Work Experience</h4>
        <div className={classes.BoxContent}>
          <EditWork data={props.data.experience} />
        </div>
      </div>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Education</h4>
        <div className={classes.BoxContent}>
          <EditEducation data={props.data.education} />
        </div>
      </div>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Bio</h4>
        <div className={classes.BoxContent}>
          <EditBio data={props.data.bio} />
        </div>
      </div>
    </div>
  );
};

export default editMainContent;
