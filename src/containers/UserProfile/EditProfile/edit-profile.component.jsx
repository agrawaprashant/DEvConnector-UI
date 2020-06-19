import React from "react";
import EditDashboard from "./EditDashboard/edit-dashboard.component";
import classes from "./edit-profile.module.css";
import Aux from "../../../hoc/Auxilliary/auxilliary";
import Social from "./EditSocial/edit-social.component";
import EditMainSection from "./EditMainContent/edit-main-content.component";
import GithubEdit from "./EditGitHubRepo/github-repo-edit.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import AddSocial from "../AddSocial/add-social.component";

class EditProfile extends React.Component {
  componentDidMount() {
    this.props.onFetchProfile(this.props.token);
  }

  render() {
    let editProfile = this.props.error ? (
      <p>{this.props.error}</p>
    ) : (
      <p>Loading...</p>
    );

    let dashboardData = {
      name: this.props.user.name,
      avatar: this.props.user.avatar,
    };

    if (this.props.profileNotFound) {
      editProfile = (
        <Aux>
          <header>
            <EditDashboard data={dashboardData} />
          </header>
          <main className={classes.MainContent}>
            <section className={classes.SideBar}>
              <AddSocial />
            </section>
            <section className={classes.Main}>
              <EditMainSection data={{}} />
            </section>
            <section className={classes.GithubEdit}>
              <GithubEdit />
            </section>
          </main>
        </Aux>
      );
    }

    if (this.props.profile) {
      dashboardData.profileData = {
        company: this.props.profile.company,
        status: this.props.profile.status,
        location: this.props.profile.location,
        handle: this.props.profile.handle,
        social: this.props.profile.social,
      };

      let mainSectionData = {
        education: this.props.profile.education,
        skills: this.props.profile.skills,
        experience: this.props.profile.experience,
        bio: this.props.profile.bio,
      };

      editProfile = (
        <Aux>
          <header>
            <EditDashboard data={dashboardData} />
          </header>
          <main className={classes.MainContent}>
            <section className={classes.SideBar}>
              {this.props.profile.social ? (
                <Social
                  data={{
                    social: this.props.profile.social,
                    github: this.props.profile.githubusername,
                  }}
                />
              ) : (
                <AddSocial />
              )}
            </section>
            <section className={classes.Main}>
              <EditMainSection data={mainSectionData} />
            </section>
            <section className={classes.GithubEdit}>
              <GithubEdit />
            </section>
          </main>
        </Aux>
      );
    }

    return editProfile;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    profile: state.profile.profileData,
    error: state.profile.error,
    profileNotFound: state.profile.profileNotFound,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProfile: (token) => dispatch(actions.fetchUserProfile(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
