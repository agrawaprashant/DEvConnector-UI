import React from "react";
import classes from "./image.module.css";
import ZoomedImage from "../ZoomedImage/zoomed-image.component";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orientation: "", zoomImage: false };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  imageCloseHandler = () => {
    this.setState({ zoomImage: false })
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
    let imageShowcase = <div className={imageClasses.join(" ")}>
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
        <button className={classes.ImageZoomBtn} onClick={() => this.setState({ zoomImage: true })}>
          <img
            onMouseEnter={this.onMouseEnterHandler}
            onMouseLeave={this.onMouseLeaveHandler}
            onLoad={this.onImgLoad}
            alt="img"
            src={image}
          />
        </button>
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
    if (this.state.zoomImage) {
      imageShowcase = <ZoomedImage closed={this.imageCloseHandler} {...this.props} />
    }
    return imageShowcase
  }
}

export default Image;
