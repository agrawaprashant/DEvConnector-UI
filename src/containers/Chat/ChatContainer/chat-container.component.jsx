import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import { createChatMessage } from "../../../shared/chat.utilities";
import ChatContactHeader from "../../../components/Chat/ChatContainerComponents/ChatContactHeader/chat-contact-header.component";
import Message from "../../../components/Chat/ChatContainerComponents/Message/message.component";
import MessageInput from "../../../components/Chat/ChatContainerComponents/MessageInput/message-input.component";
import Spinner from "../../../components/UI/ChatSpinner/chat-spinner.component";
import classes from "./chat-container.module.css";
import moment from "moment";
import ReactMoment from "react-moment";

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
    lastActive: null,
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

    socket.on(`${CHAT_CREATED}-${selectedContact._id}`, (data) => {
      const { chatId, messageText } = data;
      onSetSelectedChat(chatId, selectedContact);
      onMessageSend(
        chatId,
        createChatMessage(messageText, user.id, selectedContact._id)
      );
    });

    socket.on(USER_ONLINE, (userId, isOnline) => {
      if (userId === selectedContact._id) {
        this.setState({
          isUserOnline: isOnline,
          lastActive: !isOnline ? new Date() : null,
        });
      }
    });
    socket.on(SEND_TYPING, ({ sender, isTyping }) => {
      if (sender === selectedContact._id) {
        this.setState({ isContactTyping: isTyping });
      }
    });
    this.scrollDown();
  }

  getIsUserOnline = (isUserOnline) => {
    const { onFetchLastActive, selectedContact, token } = this.props;
    if (!isUserOnline) {
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
        sender: user,
        receiver: selectedContact._id,
        messageText,
        chatId: selectedChatId,
      });
      onMessageSend(
        selectedChatId,
        createChatMessage(messageText, user.id, selectedContact._id),
        selectedContact
      );
    } else {
      socket.emit(CHAT_CREATED, {
        sender: user,
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
      onSetSelectedChat,
      onMessageSend,
    } = this.props;
    if (prevProps.selectedContact._id !== selectedContact._id) {
      if (selectedChatId && !loadedChats[selectedChatId]) {
        onFetchChatMessages(token, selectedChatId, this.chatLoadingCallback);
        this.setState({ isChatLodaing: true });
      }
      socket.emit(USER_ONLINE, selectedContact._id, this.getIsUserOnline);
    }

    socket.on(`${CHAT_CREATED}-${selectedContact._id}`, (data) => {
      const { chatId, messageText } = data;
      if (selectedContact._id !== prevProps.selectedContact._id) {
        onSetSelectedChat(chatId, selectedContact);
        onMessageSend(
          chatId,
          createChatMessage(messageText, user.id, selectedContact._id),
          selectedContact
        );
      }
    });

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
    const {
      isChatLoading,
      isContactTyping,
      isContactOnline,
      lastActive,
    } = this.state;
    let chatMessages = null;
    if (selectedChatId && loadedChats[selectedChatId]) {
      const msgByDate = {};

      loadedChats[selectedChatId].forEach((msg) => {
        const msgDate = moment(msg.date).format("YYYY-MM-DD");

        if (msgByDate[msgDate]) {
          msgByDate[msgDate].push(msg);
        } else {
          msgByDate[msgDate] = [msg];
        }
      });

      chatMessages = Object.keys(msgByDate).map((date) => {
        return (
          <div>
            <span className={classes.ChatDate}>
              {date.split("-")[2] === new Date().getDate().toString() ? (
                "Today"
              ) : (
                <ReactMoment format="MMMM Do">{Date.parse(date)}</ReactMoment>
              )}
            </span>
            {msgByDate[date].map((message, i) => {
              return (
                <Message
                  key={i}
                  {...message}
                  isOwner={message.sender === user.id}
                />
              );
            })}
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
              lastActive
                ? lastActive
                : lastActiveMap[selectedContact._id]
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

  componentWillUnmount() {
    clearTimeout();
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
