import React from "react";
import classes from "./github-repo-edit.module.css";
const editGithub = props => {
  return (
    <div className={classes.GitHubSection}>
      <h4>Conenct to your Github Repository!</h4>
      <button className={classes.GithubBtn}>
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
          alt="github"
        />
      </button>
    </div>
  );
};

export default editGithub;
