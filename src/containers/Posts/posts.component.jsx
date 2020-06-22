import React from "react";
import Post from "./Post/post.component";
import CreatePost from "./CreatePost/create-post.component";
import * as actions from "../../store/actions/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/ChatSpinner/chat-spinner.component";
import { PRIVATE_CHAT_MESSAGE, MESSAGE_SEEN } from "../../socket/Events";
import { createChatMessage } from "../../shared/chat.utilities";
class Posts extends React.Component {
  state = {
    posts: [
      // {
      //   text: "Hello World!",
      //   user: "agrawaprashant",
      //   name: "Prashant Agrawal",
      //   id: "post1",
      //   likes: [],
      // },
      {
        text:
          "Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!",
        user: "johndoe@test.com",
        name: "John Doe",
        id: "post2",
        likes: [],
      },
    ],
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.onFetchPosts(this.props.token);
      this.props.onFetchChatList(this.props.token);
      this.props.socket.on(PRIVATE_CHAT_MESSAGE, (data) => {
        const { chatId, sender, receiver, messageText } = data;

        this.props.onMessageReceived(
          chatId,
          createChatMessage(messageText, sender.id, receiver),
          sender
        );
      });
      this.props.socket.on(MESSAGE_SEEN, (chatId, seenReceiver, seenSender) => {
        console.log(
          "CHATID:",
          chatId,
          "SEEN_RECEIVER:",
          seenReceiver,
          "SEEN_SENDER:",
          seenSender
        );
        this.props.onMessageSeen(chatId, seenSender, seenReceiver);
      });
    }
  }

  componentDidUpdate() {
    console.log("component updated!");
    // this.props.socket.on(PRIVATE_CHAT_MESSAGE, (data) => {
    //   console.log("MESSAGE RECEIVED!!", data);
    //   const { chatId, sender, receiver, messageText } = data;
    //   this.props.onMessageReceived(
    //     chatId,
    //     createChatMessage(messageText, sender, receiver)
    //   );
    // });
  }
  render() {
    let posts = null;
    if (this.props.posts.length === 0) {
      posts = <Spinner />;
    } else {
      posts = this.props.posts.map((post) => {
        return (
          <Post
            key={post._id}
            postData={post}
            loggedInUserId={this.props.loggedInUserId}
          />
        );
      });
    }
    return (
      <div>
        <CreatePost />
        {posts}
      </div>
    );
  }
  componentWillUnmount() {
    console.log("component will unmount called");
    this.props.socket.removeAllListeners();
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    posts: state.post.posts,
    loading: state.post.loading,
    error: state.post.err,
    loggedInUserId: state.auth.user.id,
    socket: state.auth.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPosts: (token) => dispatch(actions.fetchPosts(token)),
    onFetchChatList: (token) => dispatch(actions.fetchChatList(token)),
    onMessageReceived: (chatId, messageObj, sender) =>
      dispatch(actions.chatMessageReceived(chatId, messageObj, sender)),
    onMessageSeen: (chatId, seenSender, seenReceiver) =>
      dispatch(
        actions.chatMessageSeenReceived(chatId, seenSender, seenReceiver)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
