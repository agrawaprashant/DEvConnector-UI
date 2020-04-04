import React from "react";
import classes from "./add-skills-box.module.css";
import { withRouter } from "react-router-dom";

const skillBox = props => {
  return (
    <button
      className={classes.AddBtn}
      onClick={() => props.history.push(props.match.url + "/add-new-skill")}
    >
      Add Skills
    </button>
  );
};

export default withRouter(skillBox);
