import React from "react";
import Post from "../../components/Post/post.component";
import * as actions from "../../store/actions/actions";
import { connect } from "react-redux";

class Posts extends React.Component {
  state = {
    posts: [
      {
        text: "Hello World!",
        user: "agrawaprashant",
        name: "Prashant Agrawal",
        id: "post1"
      },
      {
        text:
          "Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!",
        user: "johndoe@test.com",
        name: "John Doe",
        id: "post2"
      }
    ]
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.onFetchPosts(this.props.token);
    }
  }
  render() {
    let posts = null;
    if (this.props.posts.length === 0) {
      posts = this.state.posts.map(post => {
        return <Post key={post.id} postData={post} />;
      });
    } else {
      posts = this.props.posts.map(post => {
        return <Post key={post._id} postData={post} />;
      });
    }
    return <div>{posts}</div>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    posts: state.post.posts,
    loading: state.post.loading,
    error: state.post.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: token => dispatch(actions.fetchPosts(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
