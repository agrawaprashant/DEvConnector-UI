import React from "react";
import classes from "./layout.module.css";
import Aux from "../Auxilliary/auxilliary";
import Navbar from "../../components/Navigation/Navbar/navbar.component";
import { connect } from "react-redux";
import SideDrawer from "../../components/Navigation/SideDrawer/side-drawer.component";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Aux>
        <nav
          style={{
            position: "sticky",
            top: "0",
          }}
        >
          <Navbar
            showDrawer={this.sideDrawerOpenHandler}
            isAuth={this.props.isAuthenticated}
          />
        </nav>
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.Content}> {this.props.children} </main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
