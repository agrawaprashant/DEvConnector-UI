import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";
import config from "../../config/app-config.json";

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
      const result = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.posts}`
      );
      dispatch(fetchPostsSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchPostsFailed(err));
    }
  };
};
const fetchUserPostsStart = () => {
  return {
    type: actionTypes.FETCH_USER_POSTS_START,
  };
};
const fetchUserPostsSuccess = (postData) => {
  return {
    type: actionTypes.FETCH_USER_POSTS_SUCCESS,
    payload: {
      postData: postData,
    },
  };
};
const fetchUserPostsFailed = (error) => {
  return {
    type: actionTypes.FETCH_USER_POSTS_FAILED,
    payload: {
      error: error,
    },
  };
};

export const fetchUserPosts = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserPostsStart());
      const result = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.posts}/user/${userId}`
      );
      dispatch(fetchUserPostsSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchUserPostsFailed(err));
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

export const createPost = (postData, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch(createPostStart());
      setAuthorizationToken(token);
      const result = await axios.post(
        `${config.api.baseURL}/${config.api.endPoints.posts}`,
        postData
      );
      callback();
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
        `${config.api.baseURL}/${config.api.endPoints.posts}/like/${postId}`
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
        `${config.api.baseURL}/${config.api.endPoints.posts}/unlike/${postId}`
      );
      buttonCallback();
      dispatch(unlikePostSuccess(result.data, postId));
    } catch (err) {
      console.log(err);
      dispatch(unlikePostFailed(err.response.data));
    }
  };
};
