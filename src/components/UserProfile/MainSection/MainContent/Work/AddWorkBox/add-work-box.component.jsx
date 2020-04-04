import React from "react";
import classes from "./add-work-box.module.css";
import { withRouter } from "react-router-dom";

const workBox = (props) => {
  return (
    <button
      className={classes.AddBtn}
      onClick={() => props.history.push(props.match.url + "/add-new-work")}
    >
      Add Work
    </button>
  );
};

export default withRouter(workBox);
