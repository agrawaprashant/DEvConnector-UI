import React, { Component } from "react";
import classes from "./chat-list.module.css";
import ChatListItem from "../../../components/Chat/ChatSideBarComponents/ChatListItem/chat-list-item.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Spinner from "../../../components/UI/Spinner/spinner.component";
import { PRIVATE_CHAT_MESSAGE, MESSAGE_SEEN } from "../../../socket/Events";

class ChatList extends Component {
  state = {
    chatLastMessage: {},
    selectedChatId: null,
    selectedContactId: null,
    currentUnread: {},
  };
  componentDidMount() {
    const {
      onFetchChatList,
      token,
      socket,
      followers,
      following,
      onNewChatMessageReceived,
    } = this.props;
    onFetchChatList(token);
    socket.on(PRIVATE_CHAT_MESSAGE, (data) => {
      const { messageText, chatId, sender } = data;
      const isMessageSeen = this.setUnreadChat(chatId, sender, messageText);
      if (this.checkNewChat(chatId)) {
        const user = [...followers, ...following].find((conn) => {
          return conn.user.id === sender;
        }).user;
        onNewChatMessageReceived(chatId, user, messageText);
      }
      if (isMessageSeen) {
        socket.emit(MESSAGE_SEEN, chatId);
      }
    });
  }

  setUnreadChat = (chatId, contactId, messageText) => {
    const { selectedChatId, selectedContactId } = this.state;
    const updatedCurrentUnread = { ...this.state.currentUnread };
    const updatedChatLastMessage = { ...this.state.chatLastMessage };
    updatedChatLastMessage[chatId] = messageText;
    if (selectedChatId !== chatId || selectedContactId !== contactId) {
      const currentUnreadMessages = updatedCurrentUnread[chatId];
      if (currentUnreadMessages) {
        currentUnreadMessages.push(messageText);
        updatedCurrentUnread[chatId] = currentUnreadMessages;
      } else {
        updatedCurrentUnread[chatId] = [messageText];
      }
      this.setState({
        currentUnread: updatedCurrentUnread,
        chatLastMessage: updatedChatLastMessage,
      });
      return true;
    } else {
      return false;
    }
  };

  checkNewChat = (chatId) => {
    const { recentChats } = this.props;
    if (recentChats) {
      const chat = recentChats.find((chat) => chat._id === chatId);
      if (chat) return false;
      else return true;
    } else {
      return true;
    }
  };

  getSelected = (chatId, contactId) => {
    console.log(chatId);
    const { socket, user } = this.props;
    const { currentUnread } = this.state;
    const updatedCurrentUnread = { ...currentUnread };
    if (!contactId) {
      this.setState({
        selectedContactId: chatId,
        selectedChatId: null,
      });
    } else {
      if (currentUnread[chatId]) {
        delete updatedCurrentUnread[chatId];
      }
      this.setState({
        selectedChatId: chatId,
        selectedContactId: contactId,
        currentUnread: updatedCurrentUnread,
      });
      socket.emit(MESSAGE_SEEN, chatId, user.id);
    }
  };

  render() {
    console.log(this.state);
    const { recentChats, followers, following, searchString } = this.props;
    const { chatLastMessage, selectedContactId, currentUnread } = this.state;
    let chatList = <Spinner />;
    if (recentChats) {
      chatList = recentChats.map((chat) => {
        return (
          <ChatListItem
            selectChat={this.props.selectChat}
            key={chat._id}
            name={chat.receiver.name}
            lastMessage={
              chatLastMessage[chat._id]
                ? chatLastMessage[chat._id]
                : chat.lastMessage
            }
            avatar={chat.receiver.avatar}
            id={chat._id}
            contactId={chat.receiver._id}
            date={chat.lastMessageDate}
            sendSelected={this.getSelected}
            selected={selectedContactId}
            unreadMessages={currentUnread[chat._id]}
          />
        );
      });
    }
    if (recentChats && recentChats.length === 0) {
      let followingList = following.map((following) => {
        return (
          <ChatListItem
            connectionItem
            {...following.user}
            key={following._id}
            selectChat={this.props.selectChat}
            sendSelected={this.getSelected}
            selected={selectedContactId}
          />
        );
      });
      let followersList = followers.map((follower) => {
        return (
          <ChatListItem
            selectChat={this.props.selectChat}
            connectionItem
            {...follower.user}
            key={follower._id}
            sendSelected={this.getSelected}
            selected={selectedContactId}
          />
        );
      });
      chatList = (
        <div className={classes.ConnectionsContainer}>
          {followingList.length !== 0 ? (
            <div className={classes.FollowingList}>
              <h3>Following</h3>
              {followingList}
            </div>
          ) : null}
          {followersList.length !== 0 ? (
            <div className={classes.FollowersList}>
              <h3>Followers</h3>
              {followersList}
            </div>
          ) : null}
        </div>
      );
    }
    if (searchString) {
      function arrayUnique(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
          for (var j = i + 1; j < a.length; ++j) {
            if (a[i].user.name === a[j].user.name) a.splice(j--, 1);
          }
        }

        return a;
      }
      let searchedChats = recentChats.filter((chat) =>
        chat.receiver.name
          .toLowerCase()
          .includes(searchString.toLowerCase().trim())
      );
      let connectionList = arrayUnique(followers.concat(following));
      let searchedContacts = connectionList.filter(
        (conn) =>
          conn.user.name
            .toLowerCase()
            .includes(searchString.toLowerCase().trim()) &&
          searchedChats
            .map((chat) => chat.receiver.name)
            .indexOf(conn.user.name) === -1
      );
      let chatListElements = searchedChats.map((chat) => {
        return (
          <ChatListItem
            selectChat={this.props.selectChat}
            key={chat._id}
            name={chat.receiver.name}
            lastMessage={
              chatLastMessage[chat._id]
                ? chatLastMessage[chat._id]
                : chat.lastMessage
            }
            avatar={chat.receiver.avatar}
            id={chat._id}
            contactId={chat.receiver._id}
            date={chat.lastMessageDate}
            sendSelected={this.getSelected}
            selected={selectedContactId}
            unreadMessages={currentUnread[chat._id]}
          />
        );
      });
      let contactElements = searchedContacts.map((contact) => {
        return (
          <ChatListItem
            selectChat={this.props.selectChat}
            connectionItem
            {...contact.user}
            key={contact._id}
            sendSelected={this.getSelected}
            selected={selectedContactId}
          />
        );
      });
      chatList = [...chatListElements, ...contactElements];
      if (chatList.length === 0) {
        chatList = (
          <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              margin: "1rem",
              wordWrap: "pre-line",
            }}
          >{`No results found for: ${searchString}`}</p>
        );
      }
    }
    return <div className={classes.ChatList}>{chatList}</div>;
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.removeAllListeners();
  }
}

const mapStateToProps = (state) => {
  return {
    followers: state.auth.followers,
    following: state.auth.following,
    recentChats: state.chat.chatList,
    token: state.auth.token,
    socket: state.auth.socket,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchChatList: (token) => dispatch(actions.fetchChatList(token)),
    onNewChatMessageReceived: (chatId, user, messageText) =>
      dispatch(actions.newChatMessageReceived(chatId, messageText, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
