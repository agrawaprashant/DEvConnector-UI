import React from "react";
import classes from "./chat-contact-header.module.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class ChatContactHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchedToMobile: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowSize);
    this.setState({ switchedToMobile: window.innerWidth <= 500 });
  }

  updateWindowSize = () => {
    this.setState({
      switchedToMobile: window.innerWidth <= 500,
    });
  };

  render() {
    let currentPath = window.location.href;
    if (currentPath !== "") {
      currentPath = "";
    }
    const {
      name,
      avatar,
      closed,
      isTyping,
      isOnline,
      lastActive,
      backBtnClicked,
      _id,
    } = this.props;

    return (
      <div className={classes.ChatContactHeader}>
        <div className={classes.ContactDetails}>
          {this.state.switchedToMobile ? (
            <button
              onClick={() => backBtnClicked()}
              className={classes.BackBtn}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          ) : null}
          <Link to={`${currentPath}/profile/${_id}`}>
            <img src={avatar} alt="avatar" />
          </Link>

          <div className={classes.ContactInfo}>
            <Link to={`${currentPath}/profile/${_id}`}>
              <h3>
                {name.length < 13 || !this.state.switchedToMobile
                  ? name
                  : name.substring(0, 13) + "..."}
              </h3>
            </Link>

            <div className={classes.ContactStatus}>
              {isTyping ? (
                <p className={classes.Typing}>Typing...</p>
              ) : isOnline ? (
                <p className={classes.Online}>Online</p>
              ) : lastActive ? (
                <div className={classes.LastSeen}>
                  <p style={{ display: "inline" }}>Last seen </p>
                  <Moment fromNow>{lastActive}</Moment>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={classes.Icons}>
          <button>
            <i className="fas fa-search"></i>
          </button>
          <button>
            <i className="fas fa-ellipsis-v fa-lg"></i>
          </button>
          <button onClick={() => closed()}>
            <i className="fas fa-times fa-lg"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ChatContactHeader;
