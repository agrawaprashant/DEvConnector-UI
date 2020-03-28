import React from "react";
import classes from "./post.module.css";
const Post = props => {
  return (
    <div className={classes.Post}>
      <div className={classes.Author}>
        <img src={props.postData.avatar} alt="avatar" />
        <div className={classes.AuthorDetails}>
          <h3>{props.postData.name}</h3>
          <p>agrawaprashant</p>
        </div>
      </div>
      <div className={classes.PostText}>
        <p>{props.postData.text}</p>
      </div>
      <hr />
      <div className={classes.PostTools}>
        <div className={classes.PostBtn}>
          <i class="far fa-thumbs-up"></i>
          <small>10</small>
        </div>
        <div className={classes.PostBtn}>
          <i class="far fa-comments"></i>
          <small>3</small>
        </div>
        <div className={classes.PostBtn}>
          <i class="fas fa-share"></i>
          <small>2</small>
        </div>
      </div>
    </div>
  );
};

export default Post;
