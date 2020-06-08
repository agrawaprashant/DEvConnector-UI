import React from "react";
import classes from "./chat-container-wrapper.module.css";
import ChatContainer from "../../../containers/Chat/ChatContainer/chat-container.component";

const ChatCotainerWrapper = (props) => {
  return (
    <div className={classes.ChatCotainerWrapper}>
      <ChatContainer
        closed={props.closed}
        chatId={props.selectedChat}
        contactId={props.selectedContact}
      />
    </div>
  );
};

export default ChatCotainerWrapper;
