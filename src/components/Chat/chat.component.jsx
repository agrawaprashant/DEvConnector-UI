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
    };
  }

  chatConsoleClosedHandler = () => {
    this.setState({ isChatOpen: false, isChatSelected: false });
  };

  selectChatHandler = (chatId) => {
    this.setState({ isChatSelected: true, selectedChatId: chatId });
  };

  render() {
    const { isChatOpen, isChatSelected, selectedChatId } = this.state;
    let chat;
    isChatOpen
      ? (chat = (
          <div
            style={{ width: isChatSelected ? "80%" : "30%" }}
            className={classes.ChatConsole}
          >
            <ChatSideBar
              isChatSelected={isChatSelected}
              clickChat={this.selectChatHandler}
              closed={this.chatConsoleClosedHandler}
            />
            {isChatSelected ? (
              <ChatCotainerWrapper
                selectedChat={selectedChatId}
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
