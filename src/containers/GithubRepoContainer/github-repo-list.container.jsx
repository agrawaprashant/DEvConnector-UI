import React, { Component } from "react";
import GithubRepositoryItem from "../../components/GithubRepositoryItem/github-repository-item.component";

import classes from "./github-repo-list.module.css";

class GithubRepoListContainer extends Component {
  render() {
    const { repositoryList, githubusername } = this.props;
    const list = repositoryList.map((repo) => {
      return <GithubRepositoryItem {...repo} key={repo._id} />;
    });
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
            alt="github"
          />
          <p>{githubusername}</p>
        </div>
        <div className={classes.List}>{list}</div>
      </div>
    );
  }
}

export default GithubRepoListContainer;
