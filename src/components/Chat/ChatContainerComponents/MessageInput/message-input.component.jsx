import React from "react";
import classes from "./message-input.module.css";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: "",
      lastTypingAt: null,
    };
  }

  inputChangeHandler = (e) => {
    this.setState({ messageText: e.target.value, lastTypingAt: Date.now() });
    if (!this.checkIsTyping()) {
      this.props.sendIsTyping(true);
    }
  };

  keyupHandler = (e) => {
    clearTimeout();
    if (e.keyCode === 13) {
      this.props.sendIsTyping(false);
      return;
    }
    setTimeout(() => {
      if (!this.checkIsTyping()) {
        this.props.sendIsTyping(false);
      }
    }, 500);
  };

  checkIsTyping = () => {
    return Date.now() - this.state.lastTypingAt < 500;
  };

  submitFormHandler = (e) => {
    e.preventDefault();
    if (this.state.messageText.trim() !== "") {
      this.props.sendMessageText(this.state.messageText);
    }
    this.setState({ messageText: "" });
  };

  render() {
    return (
      <div className={classes.Container}>
        <form
          onSubmit={this.submitFormHandler}
          className={classes.MessageInput}
        >
          <button>
            <i className="far fa-laugh"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message"
            value={this.state.messageText}
            onChange={this.inputChangeHandler}
            onKeyUp={this.keyupHandler}
          />
          <button type="submit">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default MessageInput;
