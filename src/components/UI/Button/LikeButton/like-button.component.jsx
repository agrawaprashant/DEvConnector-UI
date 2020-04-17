import React, { useState } from "react";
import classes from "./like-button.module.css";
import { useSelector, useDispatch } from "react-redux";

const LikeButton = (props) => {
  const [isLiked, setLike] = useState(false);
  const likeBtnClasses = [classes.LikeBtn];
  const isPostLiked = props.likes.find((like) => like.user === props.user.id);
  if (isPostLiked) {
    setLike(true);
  }
  if (isLiked) {
    likeBtnClasses.push(classes.Highlight);
  }

  const postLikeHandler = () => {};

  return (
    <div className={likeBtnClasses.join(" ")}>
      <i class="far fa-thumbs-up"></i>
      <small>{props.likes.length}</small>
    </div>
  );
};

export default LikeButton;
