import React from "react";
import classes from "./zoomed-image.module.css";
import Modal from "../../../../components/UI/Modal/modal.component";

class ZoomedImage extends React.Component {
  constructor(props) {
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
      <Modal
        orientation={this.state.orientation}
        modalClosed={this.props.closed}
        show
      >
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
            <img
              onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
              onLoad={this.onImgLoad}
              alt="img"
              src={image}
            />
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
          <div className={classes.CloseBtn}>
            <button onClick={() => this.props.closed()}>
              {" "}
              <i className="fas fa-times fa-lg"></i>
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ZoomedImage;
