import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import { CHAT_CREATED, PRIVATE_CHAT_MESSAGE } from "../../../socket/Events";
import classes from "./profile-message.module.css";
import { buildFormControl, updateObject } from "../../../shared/utility";
import { createChatMessage } from "../../../shared/chat.utilities";
import { checkValidity } from "../../../shared/checkInputValidity";

class ProfileMessage extends Component {
  state = {
    messageForm: {
      messageText: buildFormControl(
        "input",
        { type: "text", placeholder: "Type a message..." },
        { value: "" },
        { required: true }
      ),
    },
    showSuccessMessage: false,
  };

  componentDidMount() {
    const {
      socket,
      selectedContact,
      onSendMessage,
      user,
      onSelectChat,
    } = this.props;
    socket.on(`${CHAT_CREATED}-${selectedContact._id}`, (data) => {
      const { messageText, chatId } = data;
      onSendMessage(
        chatId,
        createChatMessage(messageText, user.id, selectedContact.id),
        selectedContact,
        "profile"
      );
      onSelectChat(chatId, selectedContact);
    });
  }

  inputChangedHandler = (event, control) => {
    const updatedFormControl = updateObject(this.state.messageForm[control], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        this.state.messageForm[control].validationRules
      ),
    });
    const updatedForm = updateObject(this.state.messageForm, {
      [control]: updatedFormControl,
    });

    this.setState({ messageForm: updatedForm, showSuccessMessage: false });
  };

  messageSendHandler = (e) => {
    e.preventDefault();
    const { messageText } = this.state.messageForm;
    const {
      selectedContact,
      selectedChatId,
      user,
      onSendMessage,
      socket,
    } = this.props;

    if (selectedChatId) {
      socket.emit(PRIVATE_CHAT_MESSAGE, {
        sender: user,
        receiver: selectedContact._id,
        messageText: messageText.value,
        chatId: selectedChatId,
      });
      onSendMessage(
        selectedChatId,
        createChatMessage(messageText.value, user.id, selectedContact._id),
        selectedContact,
        "profile"
      );
    } else {
      socket.emit(CHAT_CREATED, {
        sender: user,
        receiver: selectedContact._id,
        messageText: messageText.value,
      });
    }
    const updatedFormControl = updateObject(messageText, { value: "" });
    this.setState({
      messageForm: updateObject(this.state.messageForm, {
        messageText: updatedFormControl,
      }),
      showSuccessMessage: true,
    });
  };
  render() {
    const { selectedContact, closed } = this.props;
    const { messageForm, showSuccessMessage } = this.state;
    const profileMessage = (
      <div className={classes.ProfileMessage}>
        <div className={classes.Header}>
          <p>New Message</p>
          <button onClick={closed}>
            <i className="fas fa-times fa-lg"></i>
          </button>
        </div>
        <div className={classes.ContactDetails}>
          <img src={selectedContact.avatar} alt="avatar" />
          <h3>{selectedContact.name}</h3>
        </div>
        <form
          onSubmit={this.messageSendHandler}
          className={classes.ProfileMessageForm}
        >
          <textarea
            rows="7"
            value={messageForm.messageText.value}
            placeholder={messageForm.messageText.elementConfig.placeholder}
            onChange={(e) => this.inputChangedHandler(e, "messageText")}
          ></textarea>
          <div className={classes.Footer}>
            <input
              className={classes.SubmitBtn}
              type="submit"
              disabled={messageForm.messageText.value === ""}
              value="Submit"
            />
            <div
              className={classes.SuccessMsg}
              style={{ opacity: showSuccessMessage ? 1 : 0 }}
            >
              <i class="fas fa-check-circle"></i>
              <p>Message Sent</p>
            </div>
          </div>
        </form>
      </div>
    );

    return profileMessage;
  }
}

const mapStateToProps = (state) => {
  return {
    selectedContact: state.chat.selectedContact,
    selectedChatId: state.chat.selectedChat,
    socket: state.auth.socket,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSendMessage: (chatId, messageObj, receiver, messageType) =>
      dispatch(
        actions.chatMessageSent(chatId, messageObj, receiver, messageType)
      ),
    onSelectChat: (chatId, contact) =>
      dispatch(actions.selectChat(chatId, contact)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMessage);
