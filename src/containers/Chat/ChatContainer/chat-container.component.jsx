import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import * as actions from "../../../store/actions/actions";
import { createChatMessage } from "../../../shared/chat.utilities";
import ChatContactHeader from "../../../components/Chat/ChatContainerComponents/ChatContactHeader/chat-contact-header.component";
import Message from "../../../components/Chat/ChatContainerComponents/Message/message.component";
import MessageInput from "../../../components/Chat/ChatContainerComponents/MessageInput/message-input.component";
import Spinner from "../../../components/UI/ChatSpinner/chat-spinner.component";
import classes from "./chat-container.module.css";

import {
  CHAT_CREATED,
  MESSAGE_SEEN,
  PRIVATE_CHAT_MESSAGE,
  SEND_TYPING,
  USER_ONLINE,
} from "../../../socket/Events";

class ChatContainer extends Component {
  state = {
    isChatLoading: false,
    isContactOnline: false,
    isContactTyping: false,
  };

  chatLoadingCallback = () => {
    this.setState({ isChatLoading: false });
  };

  componentDidMount() {
    const {
      selectedChatId,
      selectedContact,
      token,
      loadedChats,
      onFetchChatMessages,
      socket,
      onMessageSend,
      onSetSelectedChat,
      user,
      onMessageSeen,
      chatList,
    } = this.props;
    if (selectedChatId && !loadedChats[selectedChatId]) {
      onFetchChatMessages(token, selectedChatId, this.chatLoadingCallback);
      this.setState({ isChatLoading: true });
    }
    socket.emit(USER_ONLINE, selectedContact._id, this.getIsUserOnline);
    const chatObject = chatList.find((chat) => chat._id === selectedChatId);

    if (chatObject && chatObject.unreadMessageCount !== 0) {
      socket.emit(MESSAGE_SEEN, selectedChatId, user.id, selectedContact._id);
      onMessageSeen(selectedChatId, user.id, selectedContact._id);
    }
    socket.on(USER_ONLINE, (userId, isOnline) => {
      if (userId === selectedContact._id)
        this.setState({ isUserOnline: isOnline });
    });
    socket.on(CHAT_CREATED, (data) => {
      const { chatId, messageText } = data;
      onSetSelectedChat(chatId, selectedContact);
      onMessageSend(
        chatId,
        createChatMessage(messageText, user.id, selectedContact._id)
      );
    });
    socket.on(SEND_TYPING, ({ sender, isTyping }) => {
      if (sender === selectedContact._id) {
        this.setState({ isContactTyping: isTyping });
      }
    });
    this.scrollDown();
  }

  getIsUserOnline = (isUserOnline) => {
    const {
      onFetchLastActive,
      selectedContact,
      token,
      lastActiveMap,
    } = this.props;
    if (!isUserOnline && !lastActiveMap[selectedContact._id]) {
      onFetchLastActive(token, selectedContact._id);
    }
    this.setState({ isContactOnline: isUserOnline });
  };

  messageSendHandler = (messageText) => {
    const {
      selectedChatId,
      selectedContact,
      socket,
      user,
      onMessageSend,
    } = this.props;
    if (selectedChatId) {
      socket.emit(PRIVATE_CHAT_MESSAGE, {
        sender: user.id,
        receiver: selectedContact._id,
        messageText,
        chatId: selectedChatId,
      });
      onMessageSend(
        selectedChatId,
        createChatMessage(messageText, user.id, selectedContact._id)
      );
    } else {
      socket.emit(CHAT_CREATED, {
        sender: user.id,
        receiver: selectedContact._id,
        messageText,
      });
    }

    this.setState({ isMessageSeen: false });
  };

  getIsTyping = (isTyping) => {
    const { user, selectedContact, socket } = this.props;
    socket.emit(SEND_TYPING, {
      sender: user.id,
      receiver: selectedContact._id,
      isTyping,
    });
  };

  scrollDown = () => {
    const { MessageContainer } = this.refs;
    MessageContainer.scrollTop = MessageContainer.scrollHeight;
  };

  componentDidUpdate(prevProps) {
    const {
      onFetchChatMessages,
      token,
      selectedChatId,
      selectedContact,
      socket,
      loadedChats,
      user,
      onMessageSeen,
      chatList,
    } = this.props;
    if (prevProps.selectedContact._id !== selectedContact._id) {
      if (selectedChatId && !loadedChats[selectedChatId]) {
        onFetchChatMessages(token, selectedChatId, this.chatLoadingCallback);
        this.setState({ isChatLodaing: true });
      }
      socket.emit(USER_ONLINE, selectedContact._id, this.getIsUserOnline);
    }

    const chatObject = chatList.find((chat) => chat._id === selectedChatId);
    if (chatObject && chatObject.unreadMessageCount !== 0) {
      socket.emit(MESSAGE_SEEN, selectedChatId, user.id, selectedContact._id);
      onMessageSeen(selectedChatId, user.id, selectedContact._id);
    }
    socket.on(USER_ONLINE, (userId, isOnline) => {
      if (selectedContact._id === userId) {
        this.setState({ isContactOnline: isOnline });
      }
    });

    this.scrollDown();
  }

  render() {
    const {
      selectedChatId,
      loadedChats,
      user,
      selectedContact,
      lastActiveMap,
      backBtnClicked,
      closed,
    } = this.props;
    const { isChatLoading, isContactTyping, isContactOnline } = this.state;
    let chatMessages = null;
    if (selectedChatId && loadedChats[selectedChatId]) {
      chatMessages = loadedChats[selectedChatId].map((message) => {
        return (
          <div
            className={classes.Message}
            key={uuid()}
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
    }

    return (
      <div className={classes.ChatContainer}>
        <div className={classes.ContactHeader}>
          <ChatContactHeader
            isTyping={isContactTyping}
            isOnline={isContactOnline}
            {...selectedContact}
            closed={closed}
            lastActive={
              lastActiveMap[selectedContact._id]
                ? lastActiveMap[selectedContact._id]
                : null
            }
            backBtnClicked={backBtnClicked}
          />
        </div>
        <div ref="MessageContainer" className={classes.MessageContainer}>
          {isChatLoading ? <Spinner /> : chatMessages}
        </div>
        <div className={classes.MessageInput}>
          <MessageInput
            sendIsTyping={this.getIsTyping}
            sendMessageText={this.messageSendHandler}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedChatId: state.chat.selectedChat,
    selectedContact: state.chat.selectedContact,
    loadedChats: state.chat.loadedChats,
    chatList: state.chat.chatList,
    lastActiveMap: state.chat.lastActiveMap,
    token: state.auth.token,
    user: state.auth.user,
    socket: state.auth.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchChatMessages: (token, chatId, callback) =>
      dispatch(actions.fetchChatMessages(token, chatId, callback)),
    onFetchLastActive: (token, contactId) =>
      dispatch(actions.fetchLastActive(token, contactId)),
    onMessageSend: (chatId, messageObj) =>
      dispatch(actions.chatMessageSent(chatId, messageObj)),
    onSetSelectedChat: (chatId, contactId) =>
      dispatch(actions.selectChat(chatId, contactId)),
    onMessageSeen: (chatId, seenSender, seenReceiver) =>
      dispatch(actions.chatMessageSeenSent(chatId, seenSender, seenReceiver)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
