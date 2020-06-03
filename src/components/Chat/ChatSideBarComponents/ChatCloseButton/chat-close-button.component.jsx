import React from "react";
import classes from "./chat-close-button.module.css";

const ChatCloseButton = (props) => {
  return (
    <div className={classes.ChatCloseBtn}>
      <button onClick={() => props.closed()}>
        <i className="fas fa-times fa-lg"></i>
      </button>
    </div>
  );
};

export default ChatCloseButton;
