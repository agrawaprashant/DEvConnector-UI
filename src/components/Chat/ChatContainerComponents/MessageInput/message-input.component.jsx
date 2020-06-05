import React from "react";
import classes from "./message-input.module.css";

const MessageInput = (props) => {
  return (
    <div className={classes.MessageInput}>
      <button>
        <i className="far fa-laugh"></i>
      </button>
      <input type="text" placeholder="Type a message" />
      <button>
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default MessageInput;
