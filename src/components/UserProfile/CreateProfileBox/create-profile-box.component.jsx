import React from "react";
import classes from "./create-profile-box.module.css";

const createProfileBox = props => {
  return (
    <div className={classes.ProfileNotFound}>
      <div className={classes.ProfileNotFoundContent}>
        <h2>You have not created your profile on DevConnector!</h2>
        <button className={classes.ProfileCreateBtn}>
          Create Your Profile
        </button>
      </div>
    </div>
  );
};

export default createProfileBox;
