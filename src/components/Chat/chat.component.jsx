import React from "react";
import classes from "./chat.module.css";
import ChatSideBar from "./ChatSideBarComponents/chat-side-bar.component";
import ChatCotainerWrapper from "./ChatContainerComponents/chat-container-wrapper.component";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: false,
      isChatOrContactSelected: false,
    };
  }

  chatConsoleClosedHandler = () => {
    this.setState({
      isChatOpen: false,
      isChatOrContactSelected: false,
    });
  };

  chatListClickHandler = () => {
    this.setState({ isChatOrContactSelected: true });
  };

  backBtnClickHandler = () => {
    this.setState({ isChatOrContactSelected: false });
  };

  render() {
    const { isChatOpen, isChatOrContactSelected } = this.state;
    let chat;
    isChatOpen
      ? (chat = (
          <div
            // style={{
            //   width: isChatSelected || isContactSelected ? "80%" : "30%",
            // }}
            className={classes.ChatConsole}
          >
            <ChatSideBar
              clicked={this.chatListClickHandler}
              closed={this.chatConsoleClosedHandler}
              isChatOrContactSelected={isChatOrContactSelected}
            />
            {isChatOrContactSelected ? (
              <ChatCotainerWrapper
                closed={this.chatConsoleClosedHandler}
                backBtnClicked={this.backBtnClickHandler}
              />
            ) : null}
          </div>
        ))
      : (chat = (
          <div className={classes.Chat}>
            <button
              className={classes.ChatBtn}
              onClick={() => this.setState({ isChatOpen: true })}
            >
              <i className="fas fa-comments"></i>
            </button>
          </div>
        ));
    return chat;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContactUnselect: () => dispatch(actions.unSelectContact()),
    onChatUnselect: () => dispatch(actions.unSelectChat()),
  };
};

export default connect(null, mapDispatchToProps)(Chat);
