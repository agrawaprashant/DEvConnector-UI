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

  render() {
    return (
      <div>
        <Image
          image={this.state.images[this.state.selectedImgIndex]}
          clickNext={this.nextClickHandler}
          clickPrev={this.prevClickHandler}
        />
      </div>
    );
  }
}
