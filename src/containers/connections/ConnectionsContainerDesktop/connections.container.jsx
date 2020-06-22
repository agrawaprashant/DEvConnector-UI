import React from "react";
import classes from "./connections-container.module.css";
import ConnectionItem from "../../../components/connections/ConnectionItem/connection-item.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class Connections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      connectionType,
      followers,
      following,
      isOwner,
      closed,
    } = this.props;

    let connections;
    switch (connectionType) {
      case "followers":
        connections = followers.map((follower) => {
          return (
            <ConnectionItem
              key={follower.user.id}
              {...follower.user}
              type={connectionType}
              isOwner={isOwner}
            />
          );
        });
        connections = (
          <div className={classes.Connections}>
            <div className={classes.Header}>
              <p>Followers</p>
              <button onClick={closed} className={classes.CloseBtn}>
                Close
              </button>
            </div>
            <div className={classes.ConnectionList}>
              {connections.length !== 0 ? connections : <p> 0 Followers</p>}
            </div>
          </div>
        );
        break;
      case "following":
        connections = following.map((following) => {
          return (
            <ConnectionItem
              key={following.user.id}
              {...following.user}
              type={connectionType}
              isOwner={isOwner}
              unfollow={this.unfollowClickedHandler}
              loading={this.state.loading}
              unfollowUserId={this.state.unfollowUserId}
            />
          );
        });
        connections = (
          <div className={classes.Connections}>
            <div className={classes.Header}>
              <p>Following</p>
              <button onClick={closed} className={classes.CloseBtn}>
                Close
              </button>
            </div>
            <div className={classes.ConnectionList}>
              {connections.length !== 0 ? connections : <p> 0 Following</p>}
            </div>
          </div>
        );
        break;
      default:
        return;
    }

    return connections;
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
