import React from "react";
import classes from "./add-skills-box.module.css";

const skillBox = (props) => {
  return (
    <button className={classes.AddBtn} onClick={props.clicked}>
      Add Skills
    </button>
  );
};

export default skillBox;
