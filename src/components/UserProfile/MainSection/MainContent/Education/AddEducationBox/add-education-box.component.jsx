import React from "react";
import classes from "./add-education-box.module.css";
import { withRouter } from "react-router-dom";

const educationBox = (props) => {
  return (
    <button className={classes.AddBtn} onClick={props.clicked}>
      Add Education
    </button>
  );
};

export default withRouter(educationBox);
