import React from "react";
import classes from "./layout.module.css";
import Aux from "../Auxilliary/auxilliary";
import Navbar from "../../components/Navigation/Navbar/navbar.component";
import {
  connect
} from "react-redux";

class Layout extends React.Component {
  render() {
    return ( < Aux >
      <
      nav style = {
        {
          position: "sticky",
          top: "0"
        }
      } >
      <
      Navbar isAuth = {
        this.props.isAuthenticated
      }
      /> </nav > < main className = {
        classes.Content
      } > {
        this.props.children
      } < /main> </Aux >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);