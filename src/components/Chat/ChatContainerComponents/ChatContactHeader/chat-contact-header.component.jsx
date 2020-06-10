import React from "react";
import classes from "./chat-contact-header.module.css";
import Moment from "react-moment";

const ChatContactHeader = ({
  name,
  avatar,
  closed,
  isTyping,
  isOnline,
  lastActive,
}) => {
  return (
    <div className={classes.ChatContactHeader}>
      <div className={classes.ContactDetails}>
        <img src={avatar} alt="avatar" />
        <div className={classes.ContactInfo}>
          <h3>{name}</h3>
          <div className={classes.ContactStatus}>
            {isTyping ? (
              <p className={classes.Typing}>Typing...</p>
            ) : isOnline ? (
              <p className={classes.Online}>Online</p>
            ) : lastActive ? (
              <div>
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
};

export default ChatContactHeader;
