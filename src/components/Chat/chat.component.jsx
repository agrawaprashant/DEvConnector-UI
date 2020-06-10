import React from "react";
import classes from "./chat.module.css";
import ChatSideBar from "./ChatSideBarComponents/chat-side-bar.component";
import ChatCotainerWrapper from "./ChatContainerComponents/chat-container-wrapper.component";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: false,
      isChatSelected: false,
      selectedChatId: null,
      isContactSelected: false,
      selectedContactId: null,
    };
  }

  chatConsoleClosedHandler = () => {
    this.setState({
      isChatOpen: false,
      isChatSelected: false,
      isContactSelected: false,
    });
  };

  selectChatHandler = (id, contactId, isContactSelected) => {
    if (isContactSelected) {
      this.setState({
        isContactSelected: true,
        selectedContactId: id,
        selectedChatId: null,
      });
    } else {
      this.setState({
        isChatSelected: true,
        selectedChatId: id,
        selectedContactId: contactId,
      });
    }
  };

  render() {
    const {
      isChatOpen,
      isChatSelected,
      selectedChatId,
      selectedContactId,
      isContactSelected,
    } = this.state;
    let chat;
    isChatOpen
      ? (chat = (
          <div
            style={{
              width: isChatSelected || isContactSelected ? "80%" : "30%",
            }}
            className={classes.ChatConsole}
          >
            <ChatSideBar
              isChatSelected={isChatSelected}
              isContactSelected={isContactSelected}
              clickChat={this.selectChatHandler}
              closed={this.chatConsoleClosedHandler}
              selectedChat={selectedChatId}
              selectedContact={selectedContactId}
            />
            {isChatSelected || isContactSelected ? (
              <ChatCotainerWrapper
                selectedChat={selectedChatId}
                selectedContact={selectedContactId}
                closed={this.chatConsoleClosedHandler}
              />
            ) : null}
          </div>
        ))
      : (chat = (
          <div className={classes.Chat}>
            <div className={classes.ChatBtn}>
              <button onClick={() => this.setState({ isChatOpen: true })}>
                Messaging
              </button>
            </div>
          </div>
        ));
    return chat;
  }
}

export default Chat;
