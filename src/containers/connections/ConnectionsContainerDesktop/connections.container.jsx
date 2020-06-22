import React from "react";
import classes from "./connections-container.module.css";
import ConnectionItem from "../../../components/connections/ConnectionItem/connection-item.component";

const Connections = ({
  connectionType,
  followers,
  following,
  isOwner,
  closed,
}) => {
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
};

export default Connections;
