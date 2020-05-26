import React from "react";

import classes from "./modal.module.css";
import Aux from "../../../hoc/Auxilliary/auxilliary";
import Backdrop from "../Backdrop/backdrop.component";
class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }
    // componentDidUpdate() {
    //   console.log("Modal Reremder..");
    // }
    render() {
        console.log(this.props);
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={this.props.orientation === 'landscape' ? {
                        transform: 'translateY(-190px)',
                        opacity: this.props.show ? "1" : "0"
                    }
                        : null}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;