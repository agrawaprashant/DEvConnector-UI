import React from "react";
import classes from "./chat-contact-header.module.css";

const ChatContactHeader = ({ name, avatar, closed }) => {
  return (
    <div className={classes.ChatContactHeader}>
      <div className={classes.ContactDetails}>
        <img src={avatar} alt="avatar" />
        <h3>{name}</h3>
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
