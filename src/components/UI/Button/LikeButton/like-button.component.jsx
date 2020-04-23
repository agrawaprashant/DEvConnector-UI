import React from "react";
import classes from "./like-button.module.css";

const LikeButton = (props) => {
  const likeBtnClasses = [classes.LikeBtn];
  if (props.isLiked) {
    likeBtnClasses.push(classes.Highlight);
  }
  return (
    <button
      className={likeBtnClasses.join(" ")}
      onClick={() => props.clicked()}
    >
      <i className="far fa-thumbs-up"></i>
      <small>{props.totalLikes}</small>
    </button>
  );
};

export default LikeButton;
