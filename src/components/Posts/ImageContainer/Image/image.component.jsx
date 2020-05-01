import React from "react";
import classes from "./image.module.css";

class Image extends React.Component {
  constructor(props) {
    // super(props);
    //   let imageOrientation;
    //   const image = new Image();
    //   image.onload = () => {
    //     if (image.width / image.height > 1) {
    //       imageOrientation = "landscape";
    //     } else {
    //       imageOrientation = "portrait";
    //     }
    //   };
    //   image.src = props.image;
    //   this.state = {
    //     imgOrientation: imageOrientation,
    //   };
    super(props);
    this.state = { orientation: "" };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  onImgLoad({ target: img }) {
    let orientation;
    if (img.naturalWidth / img.naturalHeight > 1) {
      orientation = "landscape";
    } else {
      orientation = "portrait";
    }
    this.setState({
      orientation: orientation,
    });
  }

  render() {
    const { image, isLast, isFirst } = this.props;
    const { orientation } = this.state;
    const imageClasses = [classes.Image];
    orientation === "landscape"
      ? imageClasses.push(classes.LandscapeImage)
      : imageClasses.push(classes.PortraitImage);
    return (
      <div className={imageClasses.join(" ")}>
        <div
          className={
            isFirst
              ? `${classes.ImageToggleBtn} ${classes.DisableBtn}`
              : classes.ImageToggleBtn
          }
        >
          <button onClick={this.props.clickPrev} disabled={isFirst}>
            <i class="fas fa-chevron-left fa-2x"></i>
          </button>
        </div>
        <div>
          <a href="/">
            <img
              onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
              onLoad={this.onImgLoad}
              alt="img"
              src={image}
            />
          </a>
        </div>
        <div
          className={
            isLast
              ? `${classes.ImageToggleBtn} ${classes.DisableBtn}`
              : classes.ImageToggleBtn
          }
        >
          <button onClick={this.props.clickNext} disabled={isLast}>
            <i class="fas fa-chevron-right fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Image;
