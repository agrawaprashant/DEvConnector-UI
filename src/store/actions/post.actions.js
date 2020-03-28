import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";

const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START
  };
};
const fetchPostsSuccess = postData => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: {
      postData: postData
    }
  };
};
const fetchPostsFailed = error => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED,
    payload: {
      error: error
    }
  };
};

export const fetchPosts = token => {
  return async dispatch => {
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
