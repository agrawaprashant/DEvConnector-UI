import React from "react";
import classes from "./create-post.module.css";
import { buildFormControl, updateObject } from "../../../shared/utility";
import { checkValidity } from "../../../shared/checkInputValidity";
import { connect } from "react-redux";
import ImagePreview from "../../../components/Posts/ImagePreview/image-preview.component";
import * as actions from "../../../store/actions/actions";
import Aux from "../../../hoc/Auxilliary/auxilliary";
import AlertMessage from "../../../components/UI/AlertMessage/alert-message.component";
import SmallSpinner from "../../../components/UI/SmallSpinner/small-spinner.component";

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
    uplaodedImages: [],
    showAlert: false,
    selectedImage: null,
    loading: false,
  };

  postCreateCallback = () => {
    const updatedFormControl = updateObject(
      this.state.postCreationForm.postContent,
      {
        value: "",
      }
    );
    const updatedForm = updateObject(this.state.postCreationForm, {
      postContent: updatedFormControl,
    });
    this.setState({
      postCreationForm: updatedForm,
      uplaodedImages: [],
      showAlert: true,
      loading: false,
    });
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
    const images = this.state.uplaodedImages.map((imageObj) => imageObj.file);
    const postFormData = new FormData();
    postFormData.append("text", this.state.postCreationForm.postContent.value);
    images.forEach((image) => postFormData.append("images", image));
    this.props.onAddPost(
      postFormData,
      this.props.token,
      this.postCreateCallback
    );
    this.setState({ loading: true });
  };

  fileInputChangedHandler = (event) => {
    let file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImageList = [...this.state.uplaodedImages];
      let imageOrientation;
      const imgObj = new Image();
      imgObj.onload = () => {
        if (imgObj.width / imgObj.height > 1) {
          imageOrientation = "landscape";
        } else {
          imageOrientation = "portrait";
        }
        const fileObj = {
          file: file,
          url: imageUrl,
          orientation: imageOrientation,
        };
        updatedImageList.push(fileObj);
        this.setState({
          uplaodedImages: updatedImageList,
          selectedImage: file,
        });
      };
      imgObj.src = imageUrl;
      event.target.value = null;
    }
  };

  imageDeleteHandler = (imgUrl) => {
    const updatedImageList = [...this.state.uplaodedImages];
    const imageFile = updatedImageList.find((image) => image.url === imgUrl);
    const removeIndex = updatedImageList.indexOf(imageFile);
    updatedImageList.splice(removeIndex, 1);
    this.setState({ uplaodedImages: updatedImageList, selectedImage: null });
  };

  alertCloseHandler = () => {
    this.setState({ showAlert: false });
    clearTimeout();
  };

  render() {
    if (this.state.showAlert) {
      setTimeout(() => {
        this.alertCloseHandler();
      }, 6000);
    }
    const images = this.state.uplaodedImages.map((image) => {
      return (
        <ImagePreview
          key={Math.random()}
          imageUrl={image.url}
          imageOrientation={image.orientation}
          deleteClicked={() => {
            this.imageDeleteHandler(image.url);
          }}
        />
      );
    });
    return (
      <Aux>
        {this.state.showAlert ? (
          <div className={classes.AlertBox}>
            <AlertMessage
              message="Post has been created!"
              closed={this.alertCloseHandler}
              type="success"
            />
          </div>
        ) : null}
        <div className={classes.CreatePostBox}>
          <div className={classes.Header}>
            <p>Create Post</p>
          </div>
          <div className={classes.InputBox}>
            <img src={this.props.user.avatar} alt="avatar" />
            <textarea
              type="text"
              value={this.state.postCreationForm.postContent.value}
              placeholder="Share Something..."
              onChange={(event) =>
                this.inputChangedHandler(event, "postContent")
              }
            />
          </div>

          <div className={classes.CreatePostTools}>
            <button
              className={`${classes.AddPostBtn} ${classes.Btn}`}
              onClick={() => this.onPostClicked()}
            >
              Post
            </button>
            <button
              className={`${classes.AddPictureBtn} ${classes.Btn}`}
              onClick={() => {
                document.getElementById("imagepicker").click();
              }}
            >
              Add Picture
            </button>

            <button className={`${classes.TagPeopleBtn} ${classes.Btn}`}>
              Tag People
            </button>
            <input
              type="file"
              id="imagepicker"
              style={{ display: "none" }}
              onChange={(event) => this.fileInputChangedHandler(event)}
            />
            {this.state.loading ? (
              <div className={classes.Spinner}>
                <SmallSpinner />
              </div>
            ) : null}
          </div>
          {this.state.uplaodedImages.length !== 0 ? (
            <div className={classes.ImagePreviewSeciton}>
              {images}
              <button
                className={classes.AddMoreImageBtn}
                onClick={() => {
                  document.getElementById("imagepicker").click();
                }}
              >
                Add More
              </button>{" "}
            </div>
          ) : null}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (postData, token, postCreateCallback) =>
      dispatch(actions.createPost(postData, token, postCreateCallback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
