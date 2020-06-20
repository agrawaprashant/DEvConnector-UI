import React from "react";
import classes from "./post.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions/actions";

import LikeButton from "../../../components/UI/Button/LikeButton/like-button.component";
import Spinner from "../../../components/UI/SmallSpinner/small-spinner.component";
import CommentSection from "./CommentSection/comment-section.component";
import Moment from "react-moment";
import ImageContainer from "../../../components/Posts/ImageContainer/image-container.component";

class Post extends React.Component {
  constructor(props) {
    super(props);
    const isPostLiked = props.postData.likes.find(
      (like) => like.user === this.props.loggedInUserId
    );

    this.state = {
      isLikeBtnLoading: false,
      totalPostLikes: props.postData.likes.length,
      isPostLiked: isPostLiked !== undefined,
      loadComments: false,
    };
  }
  buttonCallback = () => {
    this.setState({ isLikeBtnLoading: false });
  };

  postLikeBtnHandler = () => {
    if (this.state.isPostLiked) {
      this.props.onUnlikePost(
        this.props.postData._id,
        this.props.token,
        this.buttonCallback
      );

      this.setState((prevState, props) => {
        return {
          totalPostLikes: prevState.totalPostLikes - 1,
          isPostLiked: false,
        };
      });
    } else {
      this.props.onLikePost(
        this.props.postData._id,
        this.props.token,
        this.buttonCallback
      );

      this.setState((prevState, props) => {
        return {
          totalPostLikes: prevState.totalPostLikes + 1,
          isPostLiked: true,
        };
      });
    }
    this.setState({ isLikeBtnLoading: true });
  };

  render() {
    let images = null;
    if (this.props.postData.images.length !== 0) {
      images = <ImageContainer images={this.props.postData.images} />;
    }
    return (
      <div className={classes.Post}>
        <div className={classes.Author}>
          <img src={this.props.postData.avatar} alt="avatar" />
          <div className={classes.AuthorDetails}>
            <h3>{this.props.postData.name}</h3>
            <p
              onClick={() =>
                this.props.history.push(`profile/${this.props.postData.user}`)
              }
            >
              {this.props.postData.handle}
            </p>
          </div>
          <div className={classes.PostDate}>
            <Moment format="MMMM Do YYYY">{this.props.postData.date}</Moment> (
            <Moment fromNow>{this.props.postData.date}</Moment>)
          </div>
        </div>
        <div className={classes.PostText}>
          <p>{this.props.postData.text}</p>
        </div>
        <div>{images}</div>
        <div className={classes.PostTools}>
          {this.state.isLikeBtnLoading ? (
            <Spinner />
          ) : (
            <LikeButton
              isLiked={this.state.isPostLiked}
              totalLikes={this.state.totalPostLikes}
              clicked={this.postLikeBtnHandler}
            />
          )}
          <div
            className={classes.PostBtn}
            onClick={() => {
              this.setState({ loadComments: !this.state.loadComments });
            }}
          >
            <i className="far fa-comments"></i>
            <small>{this.props.postData.comments.length}</small>
          </div>

          <div className={classes.PostBtn}>
            <i className="fas fa-share"></i>
            <small>2</small>
          </div>
        </div>
        {this.state.loadComments ? (
          <CommentSection
            postId={this.props.postData._id}
            postOwner={this.props.postData.name}
          />
        ) : null}
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
    onLikePost: (postId, token, buttonCallback) =>
      dispatch(actions.likePost(postId, token, buttonCallback)),
    onUnlikePost: (postId, token, buttonCallback) =>
      dispatch(actions.unlikePost(postId, token, buttonCallback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
