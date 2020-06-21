import React from "react";
import classes from "./connection-item.module.css";
import { Link } from "react-router-dom";

const ConnectionItem = ({ id, name, avatar, isOwner, type }) => {
  let currentPath = window.location.href;
  if (currentPath !== "") {
    currentPath = "";
  }
  return (
    <div className={classes.ConnectionItem}>
      <img src={avatar} alt="avatar" />
      <Link to={`${currentPath}/profile/${id}`}>
        <p>{name}</p>
      </Link>
      {type === "following" && isOwner ? <button>Unfollow</button> : null}
    </div>
  );
};

export default React.memo(ConnectionItem);
