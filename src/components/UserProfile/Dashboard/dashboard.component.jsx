import React from "react";
import classes from "./dashboard.module.css";
import { withRouter } from "react-router-dom";

const dashboard = (props) => {
  let dashboard = (
    <header className={classes.Header}>
      <div className={classes.ProfilePic}>
        <img src={props.data.avatar} alt="avatar" />
      </div>
      <div className={classes.UserDetails}>
        <h1 style={{ color: "#333" }}>Welcome {props.data.name}</h1>
      </div>
      <div className={classes.EditBtn}>
        <button
          onClick={() => {
            props.history.push("/edit-profile");
          }}
        >
          Edit Profile
        </button>
      </div>
    </header>
  );

  if (props.data.profileData) {
    dashboard = (
      <header className={classes.Header}>
        <div className={classes.ProfilePic}>
          <img src={props.data.avatar} alt="avatar" />
        </div>
        <div className={classes.UserDetails}>
          <h3>{props.data.name}</h3>
          <div className={classes.CompanyLocation}>
            <div className={classes.Company}>
              <i class="fas fa-briefcase"></i>
              <p>
                {props.data.profileData.status} at{" "}
                {props.data.profileData.company}
              </p>
            </div>
            <div className={classes.Location}>
              <i class="fas fa-map-marker-alt"></i>
              <p>{props.data.profileData.location}</p>
            </div>
          </div>
          <div className={classes.Skills}>
            <label>Skills:</label>

            {props.data.profileData.skills.length !== 0 ? (
              <p>{props.data.profileData.skills}</p>
            ) : (
              <a href="/">Add Skills</a>
            )}
          </div>
          <div className={classes.Education}>
            <label htmlFor="Education">Education:</label>
            {props.data.profileData.education.length !== 0 ? (
              <p>{props.data.profileData.education[0].school}</p>
            ) : (
              <a href="/">Add Education</a>
            )}
          </div>
        </div>
        <div className={classes.EditBtn}>
          <button
            onClick={() => {
              props.history.push("/edit-profile");
            }}
          >
            Edit Profile
          </button>
        </div>
      </header>
    );
  }

  return dashboard;
};

export default withRouter(dashboard);
