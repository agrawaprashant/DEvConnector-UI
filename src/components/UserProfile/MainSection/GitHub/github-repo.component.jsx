import React from "react";
import { connect } from "react-redux";
import GithubRepoListContainer from "../../../../containers/GithubRepoContainer/github-repo-list.container";

import classes from "./github-repo.module.css";

class GitHubRepo extends React.Component {
  render() {
    const { repositoryList, githubusername } = this.props;

    const repositoryItemList = (
      <GithubRepoListContainer
        repositoryList={repositoryList}
        githubusername={githubusername}
      />
    );
    return <div className={classes.List}>{repositoryItemList}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    repositoryList: state.profile.profileData.githubRepositories,
    githubusername: state.profile.profileData.githubusername,
  };
};

export default connect(mapStateToProps)(GitHubRepo);
