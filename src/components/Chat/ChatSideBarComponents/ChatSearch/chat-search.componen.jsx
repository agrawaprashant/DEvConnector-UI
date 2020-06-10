import React from "react";
import classes from "./chat-search.module.css";

const ChatSearch = (props) => {
  return (
    <div className={classes.ChatSearch}>
      <div className={classes.ChatSearchInput}>
        <i className="fas fa-search"></i>
        <input
          onChange={props.sendSearchString}
          type="text"
          placeholder="Search or Start New Chat"
        />
      </div>
    </div>
  );
};

export default ChatSearch;
