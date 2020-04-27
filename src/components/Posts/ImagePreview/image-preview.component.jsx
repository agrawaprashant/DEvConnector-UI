import React from "react";
import classes from "./image-preview.module.css";

class ImagePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseIn: false,
      imageOrientation: null,
    };
  }

  onMouseEnterHandler = () => {
    this.setState({ isMouseIn: true });
  };

  onMouseLeaveHandler = () => {
    this.setState({ isMouseIn: false });
  };
  render() {
    let imagePreviewClass;
    this.props.imageOrientation === "portrait"
      ? (imagePreviewClass = classes.PortraitPreview)
      : (imagePreviewClass = classes.LandscapePreview);
    return (
      <div
        className={imagePreviewClass}
        onMouseEnter={() => this.onMouseEnterHandler()}
        onMouseLeave={() => this.onMouseLeaveHandler()}
      >
        <img src={this.props.imageUrl} alt="uploadedImg" />
        {this.state.isMouseIn ? (
          <button
            className={classes.DeleteBtn}
            onClick={this.props.deleteClicked}
          >
            <i className="fas fa-times fa-lg"></i>
          </button>
        ) : null}
      </div>
    );
  }
}

export default ImagePreview;
