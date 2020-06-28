import React from "react";
import classes from "./user-profile.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import Dashboard from "../../components/UserProfile/Dashboard/dashboard.component";
import MainSection from "../../components/UserProfile/MainSection/main-section.component";
import CreateProfileBox from "../../components/UserProfile/CreateProfileBox/create-profile-box.component";
import Spinner from "../../components/UI/ChatSpinner/chat-spinner.component";

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.onFetchUserProfile(this.props.token);
  }

  render() {
    let profile = null;
    let dashboardData = {
      name: this.props.user.name,
      avatar: this.props.user.avatar,
    };

    profile = <Spinner />;

    if (this.props.profileNotFound) {
      profile = (
        <div className={classes.Container}>
          <Dashboard data={dashboardData} />
          <hr />
          <CreateProfileBox />
        </div>
      );
    }

    if (this.props.profile) {
      dashboardData.profileData = {
        company: this.props.profile.company,
        status: this.props.profile.status,
        location: this.props.profile.location,
        education: this.props.profile.education,
        skills: this.props.profile.skills,
        handle: this.props.profile.handle,
      };

      let mainSectionData = {
        mainContentData: {
          education: this.props.profile.education,
          skills: this.props.profile.skills,
          experience: this.props.profile.experience,
          bio: this.props.profile.bio,
        },
        social: this.props.profile.social,
        githubusername: this.props.profile.githubusername,
        followers: this.props.followers,
        following: this.props.following,
      };

      profile = (
        <div className={classes.Container}>
          <Dashboard data={dashboardData} />
          <hr />
          <MainSection data={mainSectionData} />
        </div>
      );
    }

    return profile;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    profileNotFound: state.profile.profileNotFound,
    profile: state.profile.profileData,
    followers: state.connections.followers,
    following: state.connections.following,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserProfile: (token) => dispatch(actions.fetchUserProfile(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
