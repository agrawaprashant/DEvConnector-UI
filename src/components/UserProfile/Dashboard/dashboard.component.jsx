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
        <h1 className={classes.WelcomeMessage}>
          Hi {props.data.name.split(" ")[0]}, Welcome to Geeks on Fleek!
        </h1>
      </div>
      {/* <div className={classes.EditBtn}>
        <button
          onClick={() => {
            props.history.push("/edit-profile");
          }}
        >
          Edit Profile
        </button>
      </div> */}
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
            {props.data.profileData.status && props.data.profileData.company ? (
              <div className={classes.Company}>
                <i className="fas fa-briefcase"></i>
                <p>
                  {props.data.profileData.status} at{" "}
                  {props.data.profileData.company}
                </p>
              </div>
            ) : null}
            {props.data.profileData.location ? (
              <div className={classes.Location}>
                <i className="fas fa-map-marker-alt"></i>
                <p>{props.data.profileData.location}</p>
              </div>
            ) : null}
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
