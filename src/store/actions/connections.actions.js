import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";
import config from "../../config/app-config.json";

export const loadConnections = (followers, following) => {
  return {
    type: actionTypes.LOAD_CONNECTIONS,
    payload: {
      followers,
      following,
    },
  };
};

const followUserStart = () => {
  return {
    type: actionTypes.FOLLOW_USER_START,
  };
};
const followUserSuccess = (following) => {
  return {
    type: actionTypes.FOLLOW_USER_SUCCESS,
    payload: {
      following,
    },
  };
};
const followUserFailed = (error) => {
  return {
    type: actionTypes.FOLLOW_USER_START,
    payload: {
      error,
    },
  };
};

export const followUser = (token, userId, callback) => {
  return async (dispatch) => {
    try {
      dispatch(followUserStart());
      setAuthorizationToken(token);
      const response = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.connections}/follow/${userId}`
      );

      callback();
      dispatch(followUserSuccess(response.data));
    } catch (err) {
      console.log(err);
      callback();
      dispatch(followUserFailed(err.response.data));
    }
  };
};
const unfollowUserStart = () => {
  return {
    type: actionTypes.UNFOLLOW_USER_START,
  };
};
const unfollowUserSuccess = (following) => {
  return {
    type: actionTypes.UNFOLLOW_USER_SUCCESS,
    payload: {
      following,
    },
  };
};
const unfollowUserFailed = (error) => {
  return {
    type: actionTypes.UNFOLLOW_USER_START,
    payload: {
      error,
    },
  };
};

export const unfollowUser = (token, userId, callback) => {
  return async (dispatch) => {
    try {
      dispatch(unfollowUserStart());
      setAuthorizationToken(token);
      const response = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.connections}/unfollow/${userId}`
      );
      callback();
      dispatch(unfollowUserSuccess(response.data));
    } catch (err) {
      console.log(err);
      callback();
      dispatch(unfollowUserFailed(err.response.data));
    }
  };
};
