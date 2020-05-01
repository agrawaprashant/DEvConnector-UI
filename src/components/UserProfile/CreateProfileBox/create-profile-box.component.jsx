import React from "react";
import classes from "./create-profile-box.module.css";
import { withRouter } from "react-router-dom";
const createProfileBox = (props) => {
  return (
    <div className={classes.ProfileNotFound}>
      <div className={classes.ProfileNotFoundContent}>
        <h2>You have not created your profile on DevConnector!</h2>
        <button
          className={classes.ProfileCreateBtn}
          onClick={() => {
            props.history.push("/edit-profile");
          }}
        >
          Create Your Profile
        </button>
      </div>
    </div>
  );
};

export default withRouter(createProfileBox);
