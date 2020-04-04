import React from "react";
import classes from "./add-bio-box.module.css";
import { withRouter } from "react-router-dom";

const bioBox = props => {
  return (
    <button
      className={classes.AddBtn}
      onClick={() => props.history.push(props.match.url + "/add-new-bio")}
    >
      Add Bio
    </button>
  );
};

export default withRouter(bioBox);
