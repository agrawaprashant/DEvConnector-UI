import React from "react";
import classes from "./chat-list-item.module.css";
import Moment from "react-moment";

const ChatListItem = ({
  name,
  avatar,
  lastMessage,
  date,
  selectChat,
  id,
  connectionItem,
  contactId,
}) => {
  return (
    <div
      onClick={() => selectChat(id, contactId, connectionItem)}
      className={classes.ChatListItem}
    >
      <div className={classes.Avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={classes.Content}>
        <h4>{name}</h4>
        {lastMessage ? <p>{lastMessage}</p> : null}
      </div>
      {date ? (
        <div className={classes.Date}>
          <Moment fromNow>{date}</Moment>
        </div>
      ) : null}
    </div>
  );
};

export default ChatListItem;
