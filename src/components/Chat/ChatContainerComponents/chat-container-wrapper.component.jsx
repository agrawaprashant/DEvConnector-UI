import React from "react";
import classes from "./chat-container-wrapper.module.css";

const ChatCotainerWrapper = (props) => {
  return (
    <div className={classes.ChatCotainerWrapper}>
      <button onClick={() => props.closed()}>
        <i className="fas fa-times fa-lg"></i>
      </button>
    </div>
  );
};

export default ChatCotainerWrapper;
