import React from "react";
import classes from "./home.module.css";
import Posts from "../Posts/posts.component";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from "../../hoc/Auxilliary/auxilliary";
import Chat from "../../components/Chat/chat.component";

class Home extends React.Component {
  render() {
    let homePage = (
      <div className={classes.HomeAuth}>
        <div className={classes.HomeContent}>
          <h1>Welcome to Geeks on Fleek!</h1>
          <div className={classes.BtnArea}>
            <Link to="/signup" className={classes.SignupBtn}>
              Signup
            </Link>
            <Link to="/login" className={classes.Login}>
              Login
            </Link>
          </div>
        </div>
        <div className={classes.HomeDarkOverlay}></div>
      </div>
    );
    if (this.props.isAuthenticated) {
      homePage = (
        <Aux>
          <Posts />;
          <div className={classes.Chat}>
            <Chat />
          </div>
        </Aux>
      );
    }
    return homePage;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Home);
