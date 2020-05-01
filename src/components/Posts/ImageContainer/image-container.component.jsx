import React, { Component } from "react";
import Image from "./Image/image.component";

export default class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      selectedImgIndex: 0,
    };
  }

  nextClickHandler = () => {
    this.setState((pervState) => {
      return {
        selectedImgIndex: pervState.selectedImgIndex + 1,
      };
    });
  };

  prevClickHandler = () => {
    this.setState((pervState) => {
      return {
        selectedImgIndex: pervState.selectedImgIndex - 1,
      };
    });
  };

  checkIsLast = (totalImages, currentIndex) => {
    if (currentIndex >= totalImages - 1) {
      return true;
    } else {
      return false;
    }
  };
  checkIsFirst = (currentIndex) => {
    return currentIndex === 0;
  };

  render() {
    const { images, selectedImgIndex } = this.state;
    const numberOfImages = images.length;
    const isFirst = this.checkIsFirst(selectedImgIndex);
    const isLast = this.checkIsLast(numberOfImages, selectedImgIndex);
    let image = null;
    if (selectedImgIndex <= numberOfImages - 1) {
      image = (
        <Image
          image={this.state.images[selectedImgIndex]}
          clickNext={this.nextClickHandler}
          clickPrev={this.prevClickHandler}
          isLast={isLast}
          isFirst={isFirst}
        />
      );
    }

    return image;
  }
}
