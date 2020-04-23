import React from "react";
import Post from "./Post/post.component";
import CreatePost from "./CreatePost/create-post.component";
import * as actions from "../../store/actions/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/spinner.component";
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
    }
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
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    posts: state.post.posts,
    loading: state.post.loading,
    error: state.post.err,
    loggedInUserId: state.auth.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPosts: (token) => dispatch(actions.fetchPosts(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
