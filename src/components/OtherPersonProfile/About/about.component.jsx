import React from "react";
import classes from "./about.module.css";
import WorkExpCard from "../../UserProfile/MainSection/MainContent/Work/WorkExperienceCard/work-exp-card.component";
import EducationCard from "../../UserProfile/MainSection/MainContent/Education/EducationCard/education-card.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Connections from "../../../containers/connections/connections.container";
import ChatSpinner from "../../UI/ChatSpinner/chat-spinner.component";

class About extends React.Component {
  state = {
    isConnectionLoading: false,
    showFollowers: false,
    showFollowing: false,
  };
  componentDidMount() {
    const { onFetchConnections, isOwner, userId, connectionsMap } = this.props;
    if (!isOwner && !connectionsMap[userId]) {
      onFetchConnections(userId, this.fetchConnectionsCallback);
      //   this.setState({ isConnectionLoading: true });
    }
  }

  fetchConnectionsCallback = () => {
    // this.setState({ isConnectionLoading: false });
  };
  render() {
    const {
      followers,
      following,
      isOwner,
      connectionsMap,
      userId,
      social,
      bio,
      skills,
      experience,
      education,
    } = this.props;

    let followersList;
    let followingList;
    if (isOwner) {
      followersList = (
        <Connections
          followers={followers}
          connectionType="followers"
          isOwner={true}
        />
      );
      followingList = (
        <Connections
          following={following}
          connectionType="following"
          isOwner={true}
        />
      );
    } else {
      if (connectionsMap[userId]) {
        followersList = (
          <Connections
            followers={connectionsMap[userId].followers}
            connectionType="followers"
            isOwner={false}
          />
        );
        followingList = (
          <Connections
            following={connectionsMap[userId].following}
            connectionType="following"
            isOwner={false}
          />
        );
      } else {
        followersList = <ChatSpinner />;
        followersList = <ChatSpinner />;
      }
    }

    return (
      <div className={classes.About}>
        <div className={classes.SideBar}>
          <div className={classes.Connections}>
            <ul>
              <li>
                <button
                  onClick={() =>
                    this.setState({ showFollowing: true, showFollowers: false })
                  }
                >
                  Following (
                  {isOwner
                    ? following.length
                    : connectionsMap[userId]
                    ? connectionsMap[userId].following.length
                    : null}
                  )
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    this.setState({ showFollowers: true, showFollowing: false })
                  }
                >
                  Followers (
                  {isOwner
                    ? followers.length
                    : connectionsMap[userId]
                    ? connectionsMap[userId].followers.length
                    : null}
                  )
                </button>
              </li>
            </ul>
            {this.state.showFollowers ? followersList : null}
            {this.state.showFollowing ? followingList : null}
          </div>
          <div className={classes.Social}>
            <p>Social Links</p>
            {social ? (
              <ul>
                <li>
                  <i className="fab fa-twitter-square"></i>
                  <a href="/">agrawaprashant</a>
                </li>
                <li>
                  <i className="fab fa-facebook-square"></i>
                  <a href="/">agrawaprashant</a>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                  <a href="/">agrawaprashant</a>
                </li>
                <li>
                  <i className="fab fa-linkedin"></i>
                  <a href="/">agrawaprashant</a>
                </li>
                <li>
                  <i className="fab fa-youtube"></i>
                  <a href="/">agrawaprashant</a>
                </li>
              </ul>
            ) : (
              <p
                style={{
                  color: "#da4f4a",
                  fontStyle: "italic",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginTop: "1rem",
                }}
              >
                No Social Links to show!
              </p>
            )}
          </div>
        </div>
        <div className={classes.Main}>
          <div className={classes.Box}>
            <h3 className={classes.Heading}>Bio</h3>
            {bio ? (
              <p className={classes.Bio}>{bio}</p>
            ) : (
              <p
                style={{
                  color: "#da4f4a",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
                className={classes.Bio}
              >
                No Bio to show!
              </p>
            )}
          </div>
          <div className={classes.Box}>
            <h3 className={classes.Heading}>Skills</h3>
            {skills.length !== 0 ? (
              <p className={classes.Skills}>{skills.join(", ")}</p>
            ) : (
              <p
                style={{
                  color: "#da4f4a",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
                className={classes.Skills}
              >
                No Skills to show!
              </p>
            )}
          </div>
          <div className={classes.Box}>
            <h3 className={classes.Heading}>Work</h3>
            {experience.length !== 0 ? (
              experience.map((exp) => <WorkExpCard data={exp} key={exp._id} />)
            ) : (
              <p
                style={{
                  color: "#da4f4a",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
                className={classes.Skills}
              >
                No Work Experience to show!
              </p>
            )}
          </div>
          <div className={classes.Box}>
            <h3 className={classes.Heading}>Education</h3>
            {education.length !== 0 ? (
              education.map((edu) => <EducationCard data={edu} key={edu._id} />)
            ) : (
              <p
                style={{
                  color: "#da4f4a",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
                className={classes.Skills}
              >
                No Education to show!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    connectionsMap: state.connections.userConnectionsMap,
    followers: state.connections.followers,
    following: state.connections.following,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchConnections: (userId, callback) =>
      dispatch(actions.fetchUserConnections(userId, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
