import React from "react";
import classes from "./chat-list-item.module.css";
import Moment from "react-moment";

const ChatListItem = ({ name, avatar, lastMessage, date, selectChat }) => {
  return (
    <div onClick={() => selectChat()} className={classes.ChatListItem}>
      <div className={classes.Avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={classes.Content}>
        <h4>{name}</h4>
        <p>{lastMessage}</p>
      </div>
      <div className={classes.Date}>
        <Moment fromNow>{date}</Moment>
      </div>
    </div>
  );
};

export default ChatListItem;
