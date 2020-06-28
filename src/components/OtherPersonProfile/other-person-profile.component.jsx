import React from "react";
import classes from "./other-person-profile.module.css";
import About from "./About/about.component";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/actions";
import { connect } from "react-redux";
import OtherPersonPosts from "../../containers/OtherPersonProfile/Posts/other-person-posts.component";
import SmallSpinner from "../UI/SmallSpinner/small-spinner.component";
import ProfileMessage from "./Message/profile-message.component";
import GithubRepositoryList from "./GithubRespositories/other-person-repo.component";

import { Link } from "react-router-dom";

class OtherPersonProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: true,
      showPosts: false,
      showGithubRepo: false,
      loading: false,
      profileData: null,
      connectionsOnMobile: false,
    };
  }

  componentDidMount() {
    this.props.onFetchProfile(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.onFetchProfile(this.props.match.params.id);
      this.setState({
        showAbout: true,
        showPosts: false,
        showGithubRepo: false,
        showMessagePane: false,
      });
    }
    if (this.props.profileData !== prevProps.profileData) {
      this.setState({ profileData: this.props.profileData });
    }
  }

  connectionCallback = () => {
    this.setState({ loading: false });
  };

  followClickHandler = () => {
    const { token, onFollowUser } = this.props;
    onFollowUser(token, this.props.match.params.id, this.connectionCallback);
    this.setState({ loading: true });
  };

  unfollowClickHandler = () => {
    const { token, onUnfollowUser } = this.props;
    onUnfollowUser(token, this.props.match.params.id, this.connectionCallback);
    this.setState({ loading: true });
  };

  messagePaneClosedHandler = () => {
    const { onunselectChat, onunselectContact } = this.props;
    this.setState({ showMessagePane: false });
    onunselectChat();
    onunselectContact();
  };

  messageClickHandler = () => {
    const { profileData, onSelectChat, onSelectContact, chatList } = this.props;
    const chat = chatList.find(
      (chat) => chat.receiver._id === this.props.match.params.id
    );
    if (chat) {
      onSelectChat(chat._id, profileData.user);
    } else {
      onSelectContact(profileData.user);
    }
    this.setState({ showMessagePane: true });
  };
  render() {
    const { showMessagePane } = this.state;
    const { user, noProfile } = this.props;
    const profileNotFound = (
      <div className={classes.ProfileNotFound}>
        {user.id === this.props.match.params.id ? (
          <div>
            <p>You have not created your profile!</p>
            <Link className={classes.CreateProfileBtn} to="/edit-profile">
              Create Profile
            </Link>
          </div>
        ) : (
          <p>User has not created profile!</p>
        )}
      </div>
    );
    return noProfile && noProfile.msg === "Profile not found!" ? (
      profileNotFound
    ) : (
      <div className={classes.OtherPersonProfile}>
        <div
          style={{ display: this.state.connectionsOnMobile ? "none" : null }}
        >
          {this.props.profileData ? (
            <div className={classes.ProfileData}>
              <div className={classes.Avatar}>
                <img
                  src={this.props.profileData.user.avatar}
                  alt="user-avatar"
                />
              </div>
              <div className={classes.Info}>
                <div className={classes.NameHandle}>
                  <h2>{this.props.profileData.user.name}</h2>
                  <div className={classes.Handle}>
                    {/* <i
                    key={this.props.profileData.user.name}
                    className="fas fa-at"
                  ></i> */}
                    <p>@{this.props.profileData.handle}</p>
                  </div>
                </div>
                <div className={classes.Work}>
                  {/* <i
                  key={this.props.profileData.user.name}
                  className="fas fa-briefcase"
                ></i> */}
                  {this.props.profileData.company ? (
                    <p>
                      {this.props.profileData.status} at{" "}
                      {this.props.profileData.company}
                    </p>
                  ) : null}
                </div>
                <div className={classes.Location}>
                  {/* <i
                  key={this.props.profileData.user.name}
                  className="fas fa-map-marker-alt"
                ></i> */}
                  <p>{this.props.profileData.location}</p>
                </div>
                {this.props.match.params.id !== this.props.user.id ? (
                  <div className={classes.Buttons}>
                    <button
                      onClick={() =>
                        this.props.following.find(
                          (conn) => conn.user.id === this.props.match.params.id
                        )
                          ? this.unfollowClickHandler()
                          : this.followClickHandler()
                      }
                      className={classes.FollowBtn}
                    >
                      {this.props.following.find(
                        (conn) => conn.user.id === this.props.match.params.id
                      ) ? (
                        this.state.loading ? (
                          <SmallSpinner />
                        ) : (
                          "Unfollow"
                        )
                      ) : this.state.loading ? (
                        <SmallSpinner />
                      ) : (
                        "Follow"
                      )}
                    </button>
                    {this.props.following.find(
                      (conn) => conn.user.id === this.props.match.params.id
                    ) ? (
                      <button
                        onClick={this.messageClickHandler}
                        className={classes.MessageBtn}
                      >
                        Message
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="ph-item">
              <div className="ph-col-2">
                <div className="ph-picture"></div>
              </div>
              <div className="ph-row">
                <div className="ph-col-6"></div>

                <div className="ph-col"></div>

                <div className="ph-col"></div>
                <div className="ph-col"></div>
              </div>
            </div>
          )}

          <div className={classes.Tabs}>
            <ul>
              <li>
                <button
                  className={`${this.state.showAbout ? classes.Active : null} ${
                    classes.TabButton
                  }`}
                  onClick={() =>
                    this.setState({
                      showAbout: true,
                      showPosts: false,
                      showGithubRepo: false,
                    })
                  }
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className={`${this.state.showPosts ? classes.Active : null} ${
                    classes.TabButton
                  }`}
                  onClick={() =>
                    this.setState({
                      showPosts: true,
                      showAbout: false,
                      showGithubRepo: false,
                    })
                  }
                >
                  Posts
                </button>
              </li>
              <li>
                <button
                  className={`${
                    this.state.showGithubRepo ? classes.Active : null
                  } ${classes.TabButton}`}
                  onClick={() =>
                    this.setState({
                      showPosts: false,
                      showAbout: false,
                      showGithubRepo: true,
                    })
                  }
                >
                  Github
                </button>
              </li>
            </ul>
          </div>
        </div>

        {this.state.showAbout ? (
          this.state.profileData ? (
            <About
              {...this.state.profileData}
              isOwner={
                this.props.user
                  ? this.props.user.id === this.props.match.params.id
                  : false
              }
              userId={this.props.match.params.id}
              clickConnectionOnMobile={(isConnectionClicked) =>
                this.setState({ connectionsOnMobile: isConnectionClicked })
              }
            />
          ) : (
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
                <div className="ph-row">
                  <div className="ph-col-6 big"></div>
                  <div className="ph-col-4 empty big"></div>
                  <div className="ph-col-2 big"></div>
                  <div className="ph-col-4"></div>
                  <div className="ph-col-8 empty"></div>
                  <div className="ph-col-6"></div>
                  <div className="ph-col-6 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
            </div>
          )
        ) : null}
        {this.state.showPosts ? (
          <OtherPersonPosts userId={this.props.match.params.id} />
        ) : null}
        {this.state.showGithubRepo ? (
          <GithubRepositoryList
            repositoryList={this.props.profileData.githubRepositories}
            githubusername={this.props.profileData.githubusername}
          />
        ) : null}
        {showMessagePane ? (
          <ProfileMessage closed={this.messagePaneClosedHandler} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileData: state.profile.otherPersonProfile,
    user: state.auth.user,
    following: state.connections.following,
    followers: state.connections.followers,
    token: state.auth.token,
    chatList: state.chat.chatList,
    noProfile: state.profile.error,
  };
};

const mapDispatchToProfile = (dispatch) => {
  return {
    onFetchProfile: (userId) =>
      dispatch(actions.fetchOtherPersonProfile(userId)),
    onFollowUser: (token, userId, callback) =>
      dispatch(actions.followUser(token, userId, callback)),
    onUnfollowUser: (token, userId, callback) =>
      dispatch(actions.unfollowUser(token, userId, callback)),
    onSelectContact: (contact) => dispatch(actions.selectContact(contact)),
    onSelectChat: (chatId, contact) =>
      dispatch(actions.selectChat(chatId, contact)),
    onunselectChat: () => dispatch(actions.unSelectChat()),
    onunselectContact: () => dispatch(actions.unSelectContact()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProfile
)(withRouter(OtherPersonProfile));
