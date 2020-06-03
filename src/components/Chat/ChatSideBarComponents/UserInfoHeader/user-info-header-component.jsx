import React, { Component } from "react";
import classes from "./user-info-header.module.css";
import { connect } from "react-redux";

class UserInfoHeader extends Component {
  render() {
    const { userDetails } = this.props;
    return (
      <div className={classes.UserInfoHeader}>
        <img src={userDetails.avatar} alt="user-avatar" />
        <h3>{userDetails.name}</h3>
        <div className={classes.Icon}>
          <button>
            <i className="fas fa-ellipsis-v fa-lg"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserInfoHeader);
