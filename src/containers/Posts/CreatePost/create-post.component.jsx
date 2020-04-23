import React from "react";
import classes from "./create-post.module.css";
import { buildFormControl, updateObject } from "../../../shared/utility";
import { checkValidity } from "../../../shared/checkInputValidity";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class CreatePost extends React.Component {
  state = {
    postCreationForm: {
      postContent: buildFormControl(
        "input",
        { type: "text", placeholder: "Share Something..." },
        { value: "" },
        { required: true }
      ),
    },
  };

  inputChangedHandler = (event, control) => {
    const updatedFormControl = updateObject(
      this.state.postCreationForm[control],
      {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          this.state.postCreationForm[control].validationRules
        ),
      }
    );

    const updatedForm = updateObject(this.state.postCreationForm, {
      [control]: updatedFormControl,
    });

    this.setState({ postCreationForm: updatedForm });
  };

  onPostClicked = () => {
    const postData = {
      text: this.state.postCreationForm.postContent.value,
    };
    this.props.onAddPost(postData, this.props.token);
  };

  render() {
    return (
      <div className={classes.CreatePostBox}>
        <input
          className={classes.CreatePostInput}
          type="text"
          placeholder="Share Something..."
          onChange={(event) => this.inputChangedHandler(event, "postContent")}
        />
        <br />
        <div className={classes.CreatePostTools}>
          <button
            className={`${classes.AddPostBtn} ${classes.Btn}`}
            onClick={() => this.onPostClicked()}
          >
            Post
          </button>
          <button className={`${classes.AddPictureBtn} ${classes.Btn}`}>
            Add Picture
          </button>
          <button className={`${classes.TagPeopleBtn} ${classes.Btn}`}>
            Tag People
          </button>
        </div>
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
    onAddPost: (token, postData) =>
      dispatch(actions.createPost(token, postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
