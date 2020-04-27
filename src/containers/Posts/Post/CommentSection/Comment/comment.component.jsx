import React, { useState } from "react";
import classes from "./comment.module.css";
import LikeButton from "../../../../../components/UI/Button/LikeButton/like-button.component";
import Moment from "react-moment";

const Comment = (props) => {
  const [isReadMoreClicked, setReadMoreClick] = useState(false);
  const shorterComment = isReadMoreClicked ? (
    <div style={{ display: "inline" }}>
      {" "}
      {" " + props.commentData.text}{" "}
      <span
        className={classes.ReadMore}
        onClick={() => setReadMoreClick(false)}
      >
        {" "}
        Read Less
      </span>{" "}
    </div>
  ) : (
    <div style={{ display: "inline" }}>
      {" " + props.commentData.text.substring(0, 100)}{" "}
      <span className={classes.ReadMore} onClick={() => setReadMoreClick(true)}>
        {" "}
        Read More
      </span>{" "}
    </div>
  );

  console.log();

  return (
    <div className={classes.Comment}>
      <div className={classes.CommentBody}>
        <img src={props.commentData.avatar} alt="profile-pic" />
        <p>
          <a href="/">{props.commentData.name}</a>
          {props.commentData.text.length < 100
            ? " " + props.commentData.text
            : shorterComment}
        </p>
      </div>
      <div className={classes.commentFooter}>
        <div className={classes.CommentLikeBtn}>
          <LikeButton
            clicked={props.clickedLike}
            totalLikes={0}
            isLiked={false}
          />
        </div>
        <div className={classes.CommentDate}>
          <Moment format="MMMM Do YYYY">{props.commentData.date}</Moment> (
          <Moment fromNow>{props.commentData.date}</Moment>)
        </div>
      </div>
    </div>
  );
};

export default Comment;
