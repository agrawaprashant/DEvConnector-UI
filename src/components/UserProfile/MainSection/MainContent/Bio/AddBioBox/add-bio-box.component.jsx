import React from "react";
import classes from "./add-bio-box.module.css";
import { withRouter } from "react-router-dom";

const bioBox = (props) => {
  return (
    <button className={classes.AddBtn} onClick={props.addBio}>
      Add Bio
    </button>
  );
};

export default withRouter(bioBox);
