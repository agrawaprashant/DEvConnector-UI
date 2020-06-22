import React from "react";
import classes from "./about.module.css";
import WorkExpCard from "../../UserProfile/MainSection/MainContent/Work/WorkExperienceCard/work-exp-card.component";
import EducationCard from "../../UserProfile/MainSection/MainContent/Education/EducationCard/education-card.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Connections from "../../../containers/connections/ConnectionsContainerDesktop/connections.container";
import ConnectionsMobile from "../../../containers/connections/ConenctionsContainerMobile/connections-container-mobile";
import ChatSpinner from "../../UI/ChatSpinner/chat-spinner.component";
import Modal from "../../UI/Modal/modal.component";
import Aux from "../../../hoc/Auxilliary/auxilliary";

class About extends React.Component {
  state = {
    isConnectionLoading: false,
    showFollowers: false,
    showFollowing: false,
    switchedToMobile: false,
  };
  componentDidMount() {
    const { onFetchConnections, isOwner, userId, connectionsMap } = this.props;
    if (!isOwner && !connectionsMap[userId]) {
      onFetchConnections(userId, this.fetchConnectionsCallback);
    }
    window.addEventListener("resize", this.updateWindowSize);
    this.setState({ switchedToMobile: window.innerWidth <= 500 });
  }

  updateWindowSize = () => {
    this.setState({
      switchedToMobile: window.innerWidth <= 500,
    });
  };

  fetchConnectionsCallback = () => {
    // this.setState({ isConnectionLoading: false });
  };

  modalClosedHandler = () => {
    this.setState({ showFollowers: false, showFollowing: false });
    this.props.clickConnectionOnMobile(false);
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
      handle,
      clickConnectionOnMobile,
    } = this.props;
    const { switchedToMobile, showFollowers, showFollowing } = this.state;

    let followersList;
    let followingList;
    let connectionsList;
    if (isOwner) {
      if (!switchedToMobile) {
        followersList = (
          <Modal show={showFollowers} modalClosed={this.modalClosedHandler}>
            <Connections
              followers={followers}
              connectionType="followers"
              isOwner={true}
              closed={this.modalClosedHandler}
            />
          </Modal>
        );
        followingList = (
          <Modal show={showFollowing} modalClosed={this.modalClosedHandler}>
            <Connections
              following={following}
              connectionType="following"
              isOwner={true}
              closed={this.modalClosedHandler}
            />
          </Modal>
        );
      } else {
        connectionsList = (
          <ConnectionsMobile
            followers={followers}
            following={following}
            isOwner={true}
            connectionType={showFollowers ? "followers" : "following"}
            closed={this.modalClosedHandler}
            handle={handle}
            clickOnConnection={clickConnectionOnMobile}
          />
        );
      }
    } else {
      if (connectionsMap[userId]) {
        if (!switchedToMobile) {
          followersList = (
            <Modal show={showFollowers} modalClosed={this.modalClosedHandler}>
              <Connections
                followers={connectionsMap[userId].followers}
                connectionType="followers"
                isOwner={false}
                closed={this.modalClosedHandler}
              />
            </Modal>
          );
          followingList = (
            <Modal show={showFollowing} modalClosed={this.modalClosedHandler}>
              <Connections
                following={connectionsMap[userId].following}
                connectionType="following"
                isOwner={false}
                closed={this.modalClosedHandler}
              />
            </Modal>
          );
        } else {
          connectionsList = (
            <ConnectionsMobile
              followers={connectionsMap[userId].followers}
              following={connectionsMap[userId].following}
              isOwner={false}
              connectionType={showFollowers ? "followers" : "following"}
              closed={this.modalClosedHandler}
              handle={handle}
              clickOnConnection={clickConnectionOnMobile}
            />
          );
        }
      } else {
        followersList = <ChatSpinner />;
        followersList = <ChatSpinner />;
      }
    }

    return (
      <Aux>
        {switchedToMobile && (showFollowers || showFollowing) ? (
          connectionsList
        ) : (
          <div className={classes.About}>
            <div className={classes.SideBar}>
              <div className={classes.Connections}>
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        this.setState({
                          showFollowing: true,
                          showFollowers: false,
                        });
                        clickConnectionOnMobile(switchedToMobile);
                      }}
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
                      onClick={() => {
                        this.setState({
                          showFollowers: true,
                          showFollowing: false,
                        });
                        clickConnectionOnMobile(switchedToMobile);
                      }}
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
                  experience.map((exp) => (
                    <WorkExpCard data={exp} key={exp._id} />
                  ))
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
                  education.map((edu) => (
                    <EducationCard data={edu} key={edu._id} />
                  ))
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
        )}
        {!switchedToMobile
          ? showFollowers
            ? followersList
            : showFollowing
            ? followingList
            : null
          : null}
      </Aux>
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
