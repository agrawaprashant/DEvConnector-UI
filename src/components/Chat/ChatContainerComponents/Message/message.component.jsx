import React from "react";
import classes from "./message.module.css";
import Moment from "react-moment";

const Message = ({ messageText, date, isOwner, isMessageSeen }) => {
  return (
    <div
      className={classes.MessageContainer}
      style={{
        justifyContent: isOwner ? "flex-end" : "flex-start",
        margin: isOwner ? "0 0 0 50px" : "0 50px 0 0",
      }}
    >
      <div
        style={{ background: isOwner ? "#dcf8c6" : "#fff" }}
        className={classes.Message}
      >
        <div className={classes.MessageContent}>
          <p>{messageText}</p>
          <div className={classes.MessageInfo}>
            <span>
              <Moment format="h:mm A">{date}</Moment>
            </span>
            {isOwner ? (
              <span key={Math.random()}>
                {isMessageSeen ? (
                  <i
                    style={{ color: "#4fc3f7" }}
                    className="fas fa-check-double"
                  ></i>
                ) : (
                  <i className="fas fa-check"></i>
                )}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Message);
