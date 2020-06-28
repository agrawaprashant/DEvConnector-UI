import React from "react";
import classes from "./github-repo-edit.module.css";
// import config from "../../../../config/app-config.json";

const ConnectGithub = (props) => {
  return (
    <div className={classes.GitHubSection}>
      <h4>Connect to your Github Repository!</h4>
      <button
        // href={`https://github.com/login/oauth/authorize?client_id=${config.githubOAuthClientID}
        //             // &redirect_uri=${config.githubRedirectURI}/`}
        className={classes.GithubBtn}
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
          alt="github"
        />
      </button>
    </div>
  );
};

export default ConnectGithub;
