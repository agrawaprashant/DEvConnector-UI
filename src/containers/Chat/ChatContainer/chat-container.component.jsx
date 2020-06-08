import React, { Component } from "react";
import classes from "./chat-container.module.css";
import Message from "../../../components/Chat/ChatContainerComponents/Message/message.component";
// import Aux from "../../../hoc/Auxilliary/auxilliary";
import ChatContactHeader from "../../../components/Chat/ChatContainerComponents/ChatContactHeader/chat-contact-header.component";
import MessageInput from "../../../components/Chat/ChatContainerComponents/MessageInput/message-input.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import { createChatMessage } from "../../../shared/chat.utilities";
import Spinner from "../../../components/UI/Spinner/spinner.component";
import { v4 as uuid } from "uuid";

import {
  PRIVATE_CHAT_MESSAGE,
  SEND_TYPING,
  CHAT_CREATED,
} from "../../../socket/Events";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newChatId: null,
      newChatFirstMessage: null,
    };
  }

  scrollDown = () => {
    const { MessageContainer } = this.refs;
    MessageContainer.scrollTop = MessageContainer.scrollHeight;
  };

  componentDidMount() {
    const {
      chatId,
      onFetchChatMessages,
      token,
      socket,
      onMessageReceive,
    } = this.props;
    if (chatId) onFetchChatMessages(token, chatId);
    socket.on(PRIVATE_CHAT_MESSAGE, (data) => {
      console.log("MESSAGE RECEIVED!");
      const { messageText, sender, receiver } = data;
      onMessageReceive(
        data.chatId,
        createChatMessage(messageText, sender, receiver)
      );
      if (!chatId) {
        this.setState({ newChatId: data.chatId });
      }
    });
    this.scrollDown();
  }

  componentDidUpdate() {
    const { socket, onMessageSend } = this.props;
    this.scrollDown();
    socket.on(CHAT_CREATED, (chatId) => {
      onMessageSend(chatId, this.state.newChatFirstMessage);
      this.setState({ newChatId: chatId, newChatFirstMessage: null });
    });
  }
  getMessageText = (messageText) => {
    const { chatId, contactId, socket, user, onMessageSend } = this.props;
    const { newChatId } = this.state;
    if (chatId) {
      socket.emit(PRIVATE_CHAT_MESSAGE, {
        sender: user.id,
        receiver: contactId,
        messageText,
        chatId,
      });
      onMessageSend(chatId, createChatMessage(messageText, user.id, contactId));
    } else if (newChatId) {
      socket.emit(PRIVATE_CHAT_MESSAGE, {
        sender: user.id,
        receiver: contactId,
        messageText,
        chatId: newChatId,
      });
      onMessageSend(
        newChatId,
        createChatMessage(messageText, user.id, contactId)
      );
    } else {
      socket.emit(PRIVATE_CHAT_MESSAGE, {
        sender: user.id,
        receiver: contactId,
        messageText,
      });
      this.setState({
        newChatFirstMessage: createChatMessage(messageText, user.id, contactId),
      });
    }
  };

  getIsTyping = (isTyping) => {
    const { chatId } = this.props;
    const { socket } = this.props;
    socket.emit(SEND_TYPING, { chatId });
  };
  render() {
    const { chatId, chats, user, contactId } = this.props;
    const { newChatId, newChatFirstMessage } = this.state;
    let chatMessages = <Spinner />;
    if (chatId && chats[chatId]) {
      chatMessages = chats[chatId].map((message) => {
        return (
          <div
            className={classes.Message}
            style={{
              justifyContent:
                message.sender === user.id ? "flex-end" : "flex-start",
              margin: message.sender === user.id ? "0 0 0 50px" : "0 50px 0 0",
            }}
          >
            <Message
              {...message}
              key={message.id}
              isOwner={message.sender === user.id}
            />
          </div>
        );
      });
    } else if (newChatId && chats[newChatId]) {
      chatMessages = chats[newChatId].map((message) => {
        return (
          <div
            className={classes.Message}
            style={{
              justifyContent:
                message.sender === user.id ? "flex-end" : "flex-start",
              margin: message.sender === user.id ? "0 0 0 50px" : "0 50px 0 0",
            }}
          >
            <Message
              {...message}
              key={uuid.v4()}
              isOwner={message.sender === user.id}
            />
          </div>
        );
      });
    } else {
      chatMessages = null;
    }
    let contact;
    if (contactId) {
      contact = this.props.contacts.find((c) => c.user.id === contactId);
    } else {
      contact = this.props.contacts.find(
        (c) => c.user.id === chats[chatId].receiver._id
      );
    }
    return (
      <div className={classes.ChatContainer}>
        <div className={classes.ContactHeader}>
          <ChatContactHeader {...contact.user} closed={this.props.closed} />
        </div>
        <div ref="MessageContainer" className={classes.MessageContainer}>
          {this.state.newChatFirstMessage ? (
            <div
              style={{
                justifyContent:
                  newChatFirstMessage.sender === user.id
                    ? "flex-end"
                    : "flex-start",
                margin:
                  newChatFirstMessage.sender === user.id
                    ? "0 0 0 50px"
                    : "0 50px 0 0",
              }}
              className={classes.Message}
            >
              <Message
                isOwner={newChatFirstMessage.sender === user.id}
                {...newChatFirstMessage}
              />
            </div>
          ) : (
            chatMessages
          )}
        </div>
        <div className={classes.MessageInput}>
          <MessageInput
            sendIsTyping={this.getIsTyping}
            sendMessageText={this.getMessageText}
          />
        </div>
      </div>
    );
  }
  componentWillUnmount() {
    const { socket } = this.props;
    socket.removeAllListeners(PRIVATE_CHAT_MESSAGE);
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.auth.socket,
    contacts: [...state.auth.followers, ...state.auth.following],
    user: state.auth.user,
    token: state.auth.token,
    chats: state.chat.loadedChats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchChatMessages: (token, chatId) =>
      dispatch(actions.fetchChatMessages(token, chatId)),
    onMessageSend: (chatId, messageObj) =>
      dispatch(actions.chatMessageSent(chatId, messageObj)),
    onMessageReceive: (chatId, messageObj) =>
      dispatch(actions.chatMessageReceived(chatId, messageObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
