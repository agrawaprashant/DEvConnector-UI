import React from "react";
import classes from "./connections-container-mobile.module.css";
import ConnectionItem from "../../../components/connections/ConnectionItem/connection-item.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class Connections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFollowers: props.connectionType === "followers",
      showFollowing: props.connectionType !== "followers",
      loading: false,
      unfollowUserId: null,
    };
  }

  unfollowClickedHandler = (userId) => {
    this.props.onUnfollowUser(this.props.token, userId, this.unfollowCallback);
    this.setState({ loading: true, unfollowUserId: userId });
  };

  unfollowCallback = () => {
    this.setState({ loading: false, unfollowUserId: null });
  };

  render() {
    const {
      followers,
      following,
      isOwner,
      closed,
      handle,
      clickOnConnection,
    } = this.props;
    const { showFollowers, showFollowing } = this.state;

    let followersList = followers.map((follower, i) => {
      return (
        <ConnectionItem
          key={i}
          {...follower.user}
          type={"followers"}
          isOwner={isOwner}
          clicked={clickOnConnection}
        />
      );
    });
    let followingList = following.map((following, i) => {
      return (
        <ConnectionItem
          key={i}
          {...following.user}
          type={"following"}
          isOwner={isOwner}
          clicked={clickOnConnection}
          unfollow={this.unfollowClickedHandler}
          loading={this.state.loading}
          unfollowUserId={this.state.unfollowUserId}
        />
      );
    });
    // if (connectionType === "followers") {
    //   this.setState({ showFollowers: true, showFollowing: false });
    // } else {
    //   this.setState({ showFollowers: false, showFollowing: true });
    // }

    return (
      <div className={classes.Connections}>
        <div className={classes.Header}>
          <button onClick={closed}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <p>{handle}</p>
        </div>
        <div className={classes.Tabs}>
          <button
            style={{ borderBottom: showFollowers ? "2px solid #825" : null }}
            onClick={() =>
              this.setState({ showFollowers: true, showFollowing: false })
            }
          >
            Followers
          </button>
          <button
            style={{ borderBottom: showFollowing ? "2px solid #825" : null }}
            onClick={() =>
              this.setState({ showFollowers: false, showFollowing: true })
            }
          >
            Following
          </button>
        </div>
        <div className={classes.SearchContact}>
          <div className={classes.Search}>
            <i className="fas fa-search"></i>
            <input
              type="search"
              placeholder={
                showFollowers ? "Search followers..." : "Search following..."
              }
            />
          </div>
        </div>
        <div className={classes.ConnectionList}>
          {showFollowers ? followersList : followingList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUnfollowUser: (token, userId, callback) =>
      dispatch(actions.unfollowUser(token, userId, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
