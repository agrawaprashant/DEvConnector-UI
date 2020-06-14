import React, { Component } from "react";
import classes from "./chat-side-bar.module.css";
import UserInfoHeader from "./UserInfoHeader/user-info-header-component";
import ChatSearch from "./ChatSearch/chat-search.componen";
import ChatList from "../../../containers/Chat/ChatList/chat-list.component";
import ChatCloseButton from "./ChatCloseButton/chat-close-button.component";

export default class ChatSideBar extends Component {
  state = {
    searchString: null,
  };
  getSearchString = (e) => {
    this.setState({ searchString: e.target.value });
  };
  render() {
    const chatSideBarClasses = [classes.ChatSideBar];
    const { isChatOrContactSelected } = this.props;
    if (isChatOrContactSelected)
      chatSideBarClasses.push(classes.ChatSideBarMobile);
    return (
      <div
        // style={{
        //   width:
        //     this.props.isChatSelected || this.props.isContactSelected
        //       ? "30%"
        //       : "100%",
        // }}
        className={chatSideBarClasses.join(" ")}
      >
        <div>
          <UserInfoHeader />
          <ChatSearch sendSearchString={this.getSearchString} />
        </div>
        <div className={classes.ChatList}>
          <ChatList
            searchString={this.state.searchString}
            clicked={this.props.clicked}
          />
        </div>
        <div className={classes.CloseBtn}>
          {this.props.isChatOrContactSelected ? null : (
            <ChatCloseButton closed={this.props.closed} />
          )}
        </div>
      </div>
    );
  }
}
