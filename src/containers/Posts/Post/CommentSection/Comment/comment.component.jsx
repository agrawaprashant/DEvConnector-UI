import React, { useState } from "react";
import classes from "./comment.module.css";
import LikeButton from "../../../../../components/UI/Button/LikeButton/like-button.component";
import Moment from "react-moment";
import { withRouter, Link } from "react-router-dom";

const Comment = (props) => {
  console.log(props);
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

  let currentPath = window.location.href;
  if (currentPath !== "") {
    currentPath = "";
  }

  return (
    <div className={classes.Comment}>
      <div className={classes.CommentBody}>
        <img src={props.commentData.avatar} alt="profile-pic" />
        <p>
          <Link to={`${currentPath}/profile/${props.commentData.user}`}>
            {props.commentData.name}
          </Link>
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

export default withRouter(Comment);
