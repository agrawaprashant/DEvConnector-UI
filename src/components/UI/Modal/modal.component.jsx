import React from "react";

import classes from "./modal.module.css";
import Aux from "../../../hoc/Auxilliary/auxilliary";
import Backdrop from "../Backdrop/backdrop.component";
class Modal extends React.Component {
  state = {
    switchedToMobile: false,
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateWindowSize);
    this.setState({ switchedToMobile: window.innerWidth <= 500 });
  }
  updateWindowSize = () => {
    this.setState({
      switchedToMobile: window.innerWidth <= 500,
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { switchedToMobile } = this.state;
    const modalImageClasses = [classes.Modal];
    if (!switchedToMobile) {
      if (this.props.orientation === "landscape") {
        modalImageClasses.push(classes.LandscapeDesktop);
      } else {
        modalImageClasses.push(classes.PortraitDesktop);
      }
    } else {
      if (this.props.orientation === "landscape") {
        modalImageClasses.push(classes.LandscapeMobile);
      } else {
        modalImageClasses.push(classes.PortraitMobile);
      }
    }
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={modalImageClasses.join(" ")}>{this.props.children}</div>
      </Aux>
    );
  }
}

export default Modal;
