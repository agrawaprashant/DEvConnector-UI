import React from "react";
import classes from "./comment-section.module.css";
import Spinner from "../../../../components/UI/SmallSpinner/small-spinner.component";
import Comment from "./Comment/comment.component";
import { connect } from "react-redux";
import { buildFormControl, updateObject } from "../../../../shared/utility";
import { checkValidity } from "../../../../shared/checkInputValidity";
import * as actions from "../../../../store/actions/actions";

class CommentSection extends React.Component {
  state = {
    comments: null,
    commentForm: {
      commentText: buildFormControl(
        "input",
        {
          type: "text",
          placeholder: `Comment..`,
        },
        { value: "" },
        { required: true }
      ),
    },
  };
  componentDidMount() {
    if (!this.props.comments[this.props.postId]) {
      this.props.onFetchComments(this.props.postId, this.props.token);
    }
  }

  inputChangedHandler = (event) => {
    const upadtedFormControl = updateObject(
      this.state.commentForm["commentText"],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.commentForm["commentText"].validationRules
        ),
        touched: true,
      }
    );

    const updatedForm = updateObject(this.state.commentForm, {
      commentText: upadtedFormControl,
    });

    this.setState({ commentForm: updatedForm });
  };

  onSubmitComment = () => {
    const commentData = {
      text: this.state.commentForm.commentText.value,
    };
    this.props.onCommentPost(this.props.postId, this.props.token, commentData);
    const updatedFormControl = updateObject(
      this.state.commentForm.commentText,
      { value: "" }
    );
    const updatedForm = { ...this.state.commentForm };
    updatedForm.commentText = updatedFormControl;
    this.setState({ commentForm: updatedForm });
  };

  render() {
    let comments = (
      <div style={{ margin: "1rem 0" }}>
        <Spinner />
      </div>
    );
    if (this.props.comments[this.props.postId]) {
      comments = (
        <div className={classes.CommentSection}>
          <div className={classes.Comments}>
            {this.props.comments[this.props.postId].length !== 0 ? (
              this.props.comments[this.props.postId].map((comment) => {
                return <Comment commentData={comment} key={comment._id} />;
              })
            ) : (
              <p>
                {`No comments. Be the first person to comment on ${this.props.postOwner}'s post!`}
              </p>
            )}
          </div>
          <div className={classes.AddComment}>
            <img src={this.props.user.avatar} alt="user-avatar" />
            <textarea
              type="text"
              onChange={this.inputChangedHandler}
              placeholder={
                this.state.commentForm.commentText.elementConfig.placeholder
              }
              value={this.state.commentForm.commentText.value}
            />
            <button
              className={classes.CommentBtn}
              onClick={() => this.onSubmitComment()}
            >
              Comment
            </button>
          </div>
        </div>
      );
    }
    return comments;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    comments: state.comment.loadedComments,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchComments: (postId, token) =>
      dispatch(actions.fetchComments(postId, token)),
    onCommentPost: (postId, token, commentData) =>
      dispatch(actions.commentPost(commentData, postId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
