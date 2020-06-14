import React from "react";
import classes from "./chat-list-item.module.css";
import Moment from "react-moment";

class ChatListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchedToMobile: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowSize);
    this.setState({ switchedToMobile: window.innerWidth <= 500 });
  }

  updateWindowSize = () => {
    this.setState({
      switchedToMobile: window.innerWidth <= 500,
    });
  };

  render() {
    const {
      name,
      avatar,
      lastMessage,
      date,
      chatId,
      contactId,
      clicked,
      unreadMessages,
      select,
    } = this.props;

    const chatListItemStyles = [classes.ChatListItem];
    return (
      <div
        onClick={() => {
          chatId
            ? clicked(chatId, { _id: contactId, name, avatar })
            : clicked({ _id: contactId, name, avatar });
          select();
        }}
        className={chatListItemStyles.join(" ")}
      >
        <div className={classes.Avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={classes.Content}>
          <h4>{name}</h4>
          {lastMessage ? (
            <p
              style={{
                fontWeight: unreadMessages !== 0 ? "bold" : null,
                color: unreadMessages !== 0 ? "#00e25a" : null,
              }}
            >
              {lastMessage.length < 20
                ? lastMessage
                : lastMessage.substring(0, 20) + "..."}
            </p>
          ) : null}
        </div>
        {date ? (
          <div className={classes.Date}>
            <Moment fromNow>{date}</Moment>
            {unreadMessages !== 0 ? (
              <div className={classes.UnreadCount}>
                <p>{unreadMessages}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default ChatListItem;
