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
  sendSelected,
  selected,
  unreadMessages,
}) => {
  const chatListItemStyles = [classes.ChatListItem];
  let unreadMessagesCount = 0;
  if (unreadMessages) unreadMessagesCount = unreadMessages.length;
  if (id === selected) chatListItemStyles.push(classes.Active);
  return (
    <div
      onClick={() => {
        selectChat(id, contactId, connectionItem);
        sendSelected(id, contactId);
      }}
      className={chatListItemStyles.join(" ")}
    >
      <div className={classes.Avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={classes.Content}>
        <h4>{name}</h4>
        {lastMessage ? (
          <p style={{ fontWeight: unreadMessagesCount !== 0 ? "bold" : null }}>
            {lastMessage}
          </p>
        ) : null}
      </div>
      {date ? (
        <div className={classes.Date}>
          <Moment fromNow>{date}</Moment>
          {unreadMessagesCount !== 0 ? (
            <div className={classes.UnreadCount}>
              <p>{unreadMessagesCount}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ChatListItem;
