import React from "react";
import classes from "./main-content.module.css";
import Aux from "../../../../hoc/Auxilliary/auxilliary";
import Skills from "./Skills/skills.component";
import Work from "./Work/work.component";
import Education from "./Education/education.component";
import Bio from "./Bio/bio.component";

const mainContent = props => {
  return (
    <Aux>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Technical Skills</h4>
        <Skills data={props.data.skills} />
      </div>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Work Experience</h4>
        <Work data={props.data.experience} />
      </div>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Education</h4>
        <Education data={props.data.education} />
      </div>
      <div className={classes.Box}>
        <h4 className={classes.Heading}>Bio</h4>
        <Bio data={props.data.bio} />
      </div>
    </Aux>
  );
};

export default mainContent;
