import React, { Component } from "react";
import classes from "./chat-list.module.css";
import ChatListItem from "../../../components/Chat/ChatSideBarComponents/ChatListItem/chat-list-item.component";

class ChatList extends Component {
  state = {
    connections: [
      {
        id: "1",
        name: "John Doe",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "2",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "3",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "4",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "5",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "6",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "7",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "8",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "9",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "10",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "11",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
      {
        id: "12",
        name: "Mike Kennedy",
        lastMessage: "Hi there!",
        date: new Date(),
        avatar:
          "//www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm",
      },
    ],
  };
  render() {
    console.log(this.props);
    let chatList = this.state.connections.map((conn) => {
      return (
        <ChatListItem
          selectChat={this.props.selectChat}
          key={conn.id}
          {...conn}
        />
      );
    });
    return <div className={classes.ChatList}>{chatList}</div>;
  }
}

export default ChatList;
