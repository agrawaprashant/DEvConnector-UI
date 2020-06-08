import React, { Component } from "react";
import classes from "./chat-side-bar.module.css";
import UserInfoHeader from "./UserInfoHeader/user-info-header-component";
import ChatSearch from "./ChatSearch/chat-search.componen";
import ChatList from "../../../containers/Chat/ChatList/chat-list.component";
import ChatCloseButton from "./ChatCloseButton/chat-close-button.component";

export default class ChatSideBar extends Component {
  render() {
    return (
      <div
        style={{
          width:
            this.props.isChatSelected || this.props.isContactSelected
              ? "30%"
              : "100%",
        }}
        className={classes.ChatSideBar}
      >
        <div className={classes.SidebarDashboard}>
          <UserInfoHeader />
          <ChatSearch />
        </div>
        <div className={classes.ChatList}>
          <ChatList selectChat={this.props.clickChat} />
        </div>
        <div className={classes.CloseBtn}>
          {this.props.isChatSelected || this.props.isContactSelected ? null : (
            <ChatCloseButton closed={this.props.closed} />
          )}
        </div>
      </div>
    );
  }
}
