import React from "react";
import classes from "./other-person-repo.module.css";
import GithubRepoListContainer from "../../../containers/GithubRepoContainer/github-repo-list.container";

const OtherPersonRepo = ({ repositoryList, githubusername }) => {
  return (
    <div className={classes.List}>
      <GithubRepoListContainer
        repositoryList={repositoryList}
        githubusername={githubusername}
      />
    </div>
  );
};

export default OtherPersonRepo;
