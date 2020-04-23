import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";

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

const commentPostStart = () => {
  return {
    type: actionTypes.COMMENT_POST_START,
  };
};

const commentPostSuccess = (commentData, postId) => {
  return {
    type: actionTypes.COMMENT_POST_SUCCESS,
    payload: {
      commentData: commentData,
      postId: postId,
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
      dispatch(commentPostSuccess(result.data, postId));
    } catch (err) {
      console.log(err);
      dispatch(commentPostFailed(err.response.data));
    }
  };
};
