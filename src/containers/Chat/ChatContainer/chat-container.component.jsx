import React, { Component } from "react";
import classes from "./chat-container.module.css";
import Message from "../../../components/Chat/ChatContainerComponents/Message/message.component";
import Aux from "../../../hoc/Auxilliary/auxilliary";
import ChatContactHeader from "../../../components/Chat/ChatContainerComponents/ChatContactHeader/chat-contact-header.component";
import MessageInput from "../../../components/Chat/ChatContainerComponents/MessageInput/message-input.component";

export default class ChatContainer extends Component {
  state = {
    messages: [
      {
        id: "1",
        messageText: "Hi",
        date: new Date(),
        isOwner: true,
        sent: false,
        seen: true,
      },
      {
        id: "2",
        messageText: "Hello asdfasfasf asfsfasdfasdfs s",
        date: new Date(),
        isOwner: false,
        sent: true,
        seen: true,
      },
      {
        id: "3",
        messageText: "Sup ?",
        date: new Date(),
        isOwner: false,
        sent: true,
        seen: true,
      },
      {
        id: "4",
        messageText: "I am good",
        date: new Date(),
        isOwner: true,
        sent: true,
        seen: true,
      },
      {
        id: "5",
        messageText: "Working on this cool chat applcation",
        date: new Date(),
        isOwner: true,
        sent: true,
        seen: true,
      },
      {
        id: "6",
        messageText: "great man!!",
        date: new Date(),
        isOwner: false,
        sent: true,
        seen: true,
      },
    ],
  };

  scrollDown = () => {
    const { MessageContainer } = this.refs;
    MessageContainer.scrollTop = MessageContainer.scrollHeight;
  };

  componentDidMount() {
    this.scrollDown();
  }
  render() {
    let messages = this.state.messages.map((message) => {
      return (
        <div
          className={classes.Message}
          style={{
            justifyContent: message.isOwner ? "flex-end" : "flex-start",
            margin: message.isOwner ? "0 0 0 50px" : "0 50px 0 0",
          }}
        >
          <Message {...message} key={message.id} />
        </div>
      );
    });
    return (
      <div className={classes.ChatContainer}>
        <div className={classes.ContactHeader}>
          <ChatContactHeader
            name="Prashant Agrawal"
            avatar="http://www.gravatar.com/avatar/5634ff13f953ebcb374ac8c349bcfcfe?s=200&r=pg&d=mm"
            closed={this.props.closed}
          />
        </div>
        <div ref="MessageContainer" className={classes.MessageContainer}>
          {messages}
        </div>
        <div className={classes.MessageInput}>
          <MessageInput />
        </div>
      </div>
    );
  }
}
