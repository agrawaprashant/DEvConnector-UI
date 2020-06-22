import React from "react";
import classes from "./connection-item.module.css";
import { Link } from "react-router-dom";
import SmallSpinner from "../../UI/SmallSpinner/small-spinner.component";

const ConnectionItem = ({
  id,
  name,
  avatar,
  isOwner,
  type,
  clicked,
  unfollow,
  loading,
  unfollowUserId,
}) => {
  let currentPath = window.location.href;
  if (currentPath !== "") {
    currentPath = "";
  }
  return (
    <div className={classes.ConnectionItem}>
      <img src={avatar} alt="avatar" />

      <Link
        onClick={() => (clicked ? clicked(false) : null)}
        to={`${currentPath}/profile/${id}`}
      >
        <p>{name}</p>
      </Link>
      {type === "following" && isOwner ? (
        <button onClick={() => unfollow(id)}>
          {loading && unfollowUserId === id ? <SmallSpinner /> : "Unfollow"}
        </button>
      ) : null}
    </div>
  );
};

export default React.memo(ConnectionItem);
