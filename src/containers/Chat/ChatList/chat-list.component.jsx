import React, { Component } from "react";
import classes from "./chat-list.module.css";
import ChatListItem from "../../../components/Chat/ChatSideBarComponents/ChatListItem/chat-list-item.component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Spinner from "../../../components/UI/Spinner/spinner.component";

class ChatList extends Component {
  componentDidMount() {
    const { onFetchChatList, token } = this.props;
    onFetchChatList(token);
  }

  render() {
    const { recentChats, followers, following } = this.props;
    console.log(recentChats);
    let chatList = <Spinner />;
    if (recentChats) {
      chatList = recentChats.map((chat) => {
        return (
          <ChatListItem
            selectChat={this.props.selectChat}
            key={chat._id}
            name={chat.receiver.name}
            lastMessage={chat.lastMessage}
            avatar={chat.receiver.avatar}
            id={chat._id}
            contactId={chat.receiver._id}
          />
        );
      });
    }
    if (recentChats && recentChats.length === 0) {
      console.log("asdfasfasfasd");
      let followingList = following.map((following) => {
        return (
          <ChatListItem
            connectionItem
            {...following.user}
            key={following._id}
            selectChat={this.props.selectChat}
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
    return <div className={classes.ChatList}>{chatList}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    followers: state.auth.followers,
    following: state.auth.following,
    recentChats: state.chat.chatList,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchChatList: (token) => dispatch(actions.fetchChatList(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
