import React, { Component } from "react";
import classes from "./chat-container.module.css";
import Message from "../../../components/Chat/ChatContainerComponents/Message/message.component";
// import Aux from "../../../hoc/Auxilliary/auxilliary";
import ChatContactHeader from "../../../components/Chat/ChatContainerComponents/ChatContactHeader/chat-contact-header.component";
import MessageInput from "../../../components/Chat/ChatContainerComponents/MessageInput/message-input.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import { createChatMessage } from "../../../shared/chat.utilities";
import Spinner from "../../../components/UI/ChatSpinner/chat-spinner.component";
import equel from "fast-deep-equal";
import { v4 as uuid } from "uuid";

import {
  PRIVATE_CHAT_MESSAGE,
  SEND_TYPING,
  CHAT_CREATED,
  USER_ONLINE,
  MESSAGE_SEEN,
} from "../../../socket/Events";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    const { chatId, contactId, socket } = this.props;
    this.state = {
      newChatId: null,
      newChatFirstMessage: null,
      isTyping: false,
      isContactOnline: false,
      isChatLodaing: false,
      isMessageSeen: false,
      selectedChatId: null,
    };
  }

  scrollDown = () => {
    const { MessageContainer } = this.refs;
    MessageContainer.scrollTop = MessageContainer.scrollHeight;
  };

  chatLoadingCallback = () => {
    this.setState({ isChatLodaing: false });
  };

  componentDidMount() {
    const {
      chatId,
      onFetchChatMessages,
      token,
      socket,
      onMessageReceive,
      contactId,
      onMessageSend,
      onFetchLastActive,
      onNewChatMessageSent,
      contacts,
    } = this.props;
    if (chatId) {
      onFetchChatMessages(token, chatId, this.chatLoadingCallback);
      this.setState({ isChatLodaing: true, selectedChatId: chatId });
    }
    socket.on(CHAT_CREATED, (chatId, messageText, receiver) => {
      const receiverUser = contacts.find((conn) => conn.user.id === receiver)
        .user;
      onNewChatMessageSent(chatId, messageText, receiverUser);
      onMessageSend(chatId, this.state.newChatFirstMessage);
      this.setState({ newChatId: chatId, newChatFirstMessage: null });
    });
    socket.on(PRIVATE_CHAT_MESSAGE, (data) => {
      const { messageText, sender, receiver } = data;
      onMessageReceive(
        data.chatId,
        createChatMessage(messageText, sender, receiver)
      );
      if (!chatId) {
        this.setState({ newChatId: data.chatId });
      } else {
        socket.emit(MESSAGE_SEEN, chatId, receiver, sender);
      }
    });

    socket.emit(USER_ONLINE, contactId, this.getIsUserOnline);
    socket.on(USER_ONLINE, (userId, isOnline) => {
      if (contactId === userId) {
        this.setState({ isContactOnline: isOnline });
        if (!isOnline) onFetchLastActive(token, contactId);
      }
    });

    socket.on(SEND_TYPING, (data) => {
      const { isTyping, chatId } = data;
      if (chatId === this.state.selectedChatId) {
        this.setState({ isTyping });
      }
    });
    this.scrollDown();
  }

  // shouldComponentUpdate(prevProps) {
  //   return prevProps !== this.props;
  // }

  componentDidUpdate(prevProps) {
    const {
      onFetchChatMessages,
      onFetchLastActive,
      token,
      chatId,
      contactId,
      socket,
    } = this.props;
    if (!equel(prevProps, this.props)) {
      if (chatId) {
        onFetchChatMessages(token, chatId, this.chatLoadingCallback);
        this.setState({ isChatLodaing: true, selectedChatId: chatId });
      }
      socket.emit(USER_ONLINE, contactId, this.getIsUserOnline);
    }

    socket.on(USER_ONLINE, (userId, isOnline) => {
      if (contactId === userId) {
        this.setState({ isContactOnline: isOnline });
        if (!isOnline) onFetchLastActive(token, contactId);
      }
    });

    this.scrollDown();
  }

  getIsUserOnline = (isUserOnline) => {
    const { onFetchLastActive, contactId, token } = this.props;
    if (!isUserOnline) {
      onFetchLastActive(token, contactId);
    }
    this.setState({ isContactOnline: isUserOnline });
  };

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
    const { chatId, user, contactId, socket } = this.props;
    console.log("contactId  ", contactId, "chatId  ", chatId);
    socket.emit(SEND_TYPING, {
      sender: user.id,
      chatId,
      receiver: contactId,
      isTyping,
    });
  };

  render() {
    const { chatId, chats, user, contactId, lastActiveMap } = this.props;
    const { newChatId, newChatFirstMessage, isChatLodaing } = this.state;
    let chatMessages = <Spinner />;
    if (chatId && chats[chatId]) {
      chatMessages = chats[chatId].map((message) => {
        return (
          <div
            className={classes.Message}
            key={message._id}
            style={{
              justifyContent:
                message.sender === user.id ? "flex-end" : "flex-start",
              margin: message.sender === user.id ? "0 0 0 50px" : "0 50px 0 0",
            }}
          >
            <Message {...message} isOwner={message.sender === user.id} />
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
              key={uuid()}
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
          <ChatContactHeader
            isTyping={this.state.isTyping}
            isOnline={this.state.isContactOnline}
            {...contact.user}
            closed={this.props.closed}
            lastActive={
              lastActiveMap[contactId] ? lastActiveMap[contactId] : null
            }
          />
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
          ) : isChatLodaing ? (
            <Spinner />
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
    socket.removeAllListeners();
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.auth.socket,
    contacts: [...state.auth.followers, ...state.auth.following],
    user: state.auth.user,
    token: state.auth.token,
    chats: state.chat.loadedChats,
    lastActiveMap: state.chat.lastActiveMap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchChatMessages: (token, chatId, callback) =>
      dispatch(actions.fetchChatMessages(token, chatId, callback)),
    onMessageSend: (chatId, messageObj) =>
      dispatch(actions.chatMessageSent(chatId, messageObj)),
    onMessageReceive: (chatId, messageObj) =>
      dispatch(actions.chatMessageReceived(chatId, messageObj)),
    onFetchLastActive: (token, userId) =>
      dispatch(actions.fetchLastActive(token, userId)),
    onNewChatMessageSent: (chatId, messageText, receiver) =>
      dispatch(actions.newChatMessageSent(chatId, messageText, receiver)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
