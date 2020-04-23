import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";

const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START,
  };
};
const fetchPostsSuccess = (postData) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: {
      postData: postData,
    },
  };
};
const fetchPostsFailed = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED,
    payload: {
      error: error,
    },
  };
};

export const fetchPosts = (token) => {
  return async (dispatch) => {
    try {
      dispatch(fetchPostsStart());
      setAuthorizationToken(token);
      const result = await axios.get("http://localhost:5000/api/posts");
      dispatch(fetchPostsSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchPostsFailed(err));
    }
  };
};

const createPostStart = () => {
  return {
    type: actionTypes.CREATE_POST_START,
  };
};

const createPostSuccess = (postData) => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    payload: {
      postData: postData,
    },
  };
};

const createPostFailed = (error) => {
  return {
    type: actionTypes.CREATE_POST_FAILED,
    payload: {
      error: error,
    },
  };
};

export const createPost = (postData, token) => {
  return async (dispatch) => {
    try {
      dispatch(createPostStart());
      setAuthorizationToken(token);
      const result = await axios.post(
        "http://localhost:5000/api/posts/",
        postData
      );
      dispatch(createPostSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(createPostFailed(err.response.data));
    }
  };
};

const likePostStart = () => {
  return {
    type: actionTypes.LIKE_POST_START,
  };
};

const likePostSuccess = (likeData, postId) => {
  return {
    type: actionTypes.LIKE_POST_SUCCESS,
    payload: {
      likeData: likeData,
      postId: postId,
    },
  };
};

const likePostFailed = (error) => {
  return {
    type: actionTypes.LIKE_POST_FAILED,
    payload: {
      error: error,
    },
  };
};

export const likePost = (postId, token, buttonCallback) => {
  return async (dispatch) => {
    try {
      dispatch(likePostStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        "http://localhost:5000/api/posts/like/" + postId
      );
      buttonCallback();
      dispatch(likePostSuccess(result.data, postId));
    } catch (err) {
      console.log(err);
      dispatch(likePostFailed(err.response.data));
    }
  };
};

const unlikePostStart = () => {
  return {
    type: actionTypes.UNLIKE_POST_START,
  };
};

const unlikePostSuccess = (unlikeData, postId) => {
  return {
    type: actionTypes.UNLIKE_POST_SUCCESS,
    payload: {
      unlikeData: unlikeData,
      postId: postId,
    },
  };
};

const unlikePostFailed = (error) => {
  return {
    type: actionTypes.UNLIKE_POST_FAILED,
    payload: {
      error: error,
    },
  };
};

export const unlikePost = (postId, token, buttonCallback) => {
  return async (dispatch) => {
    try {
      dispatch(unlikePostStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        "http://localhost:5000/api/posts/unlike/" + postId
      );
      buttonCallback();
      dispatch(unlikePostSuccess(result.data, postId));
    } catch (err) {
      console.log(err);
      dispatch(unlikePostFailed(err.response.data));
    }
  };
};

const commentPostStart = () => {
  return {
    type: actionTypes.COMMENT_POST_START,
  };
};

const commentPostSuccess = (commentData) => {
  return {
    type: actionTypes.COMMENT_POST_SUCCESS,
    payload: {
      likeData: commentData,
    },
  };
};

const commentPostFailed = (error) => {
  return {
    type: actionTypes.COMMENT_POST_FAILED,
    payload: {
      error: error,
    },
  };
};

export const commentPost = (commentContent, postId, token) => {
  return async (dispatch) => {
    try {
      dispatch(commentPostStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        "http://localhost:5000/api/posts/comment/" + postId,
        commentContent
      );
      dispatch(commentPostSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(commentPostFailed(err.response.data));
    }
  };
};

const commentsFetchStart = (postId) => {
  return {
    type: actionTypes.COMMENTS_FETCH_START,
    payload: {
      postId: postId,
    },
  };
};
const commentsFetchSuccess = (commentData, postId) => {
  return {
    type: actionTypes.COMMENTS_FETCH_SUCCESS,
    payload: {
      commentData: commentData,
      postId: postId,
    },
  };
};
const commentsFetchFailed = (error, postId) => {
  return {
    type: actionTypes.COMMENTS_FETCH_FAILED,
    payload: {
      errror: error,
      postId: postId,
    },
  };
};

export const fetchComments = (postId, token) => {
  return async (dispatch) => {
    try {
      dispatch(commentsFetchStart());
      setAuthorizationToken(token);
      const result = await axios.get(
        "http://localhost:5000/api/posts/comment/" + postId
      );
      dispatch(commentsFetchSuccess(result.data, postId));
    } catch (err) {
      dispatch(commentsFetchFailed(err.response.data, postId));
    }
  };
};
