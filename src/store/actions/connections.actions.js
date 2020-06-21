import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";
import config from "../../config/app-config.json";
import store from "../store";

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
const followUserSuccess = (following, userId) => {
  const loggedInUser = store.getState().auth.user;
  return {
    type: actionTypes.FOLLOW_USER_SUCCESS,
    payload: {
      following,
      userId,
      loggedInUser,
    },
  };
};
const followUserFailed = (error) => {
  return {
    type: actionTypes.FOLLOW_USER_FAILED,
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
      dispatch(followUserSuccess(response.data, userId));
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
const unfollowUserSuccess = (following, userId) => {
  const loggedInUser = store.getState().auth.user;
  return {
    type: actionTypes.UNFOLLOW_USER_SUCCESS,
    payload: {
      following,
      userId,
      loggedInUser,
    },
  };
};
const unfollowUserFailed = (error) => {
  return {
    type: actionTypes.UNFOLLOW_USER_FAILED,
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
      dispatch(unfollowUserSuccess(response.data, userId));
    } catch (err) {
      console.log(err);
      callback();
      dispatch(unfollowUserFailed(err.response.data));
    }
  };
};

const fetchUserConnectionsStart = () => {
  return {
    type: actionTypes.FETCH_USER_CONNECTIONS_START,
  };
};
const fetchUserConnectionsSuccess = (connections, userId) => {
  return {
    type: actionTypes.FETCH_USER_CONNECTIONS_SUCCESS,
    payload: {
      followers: connections.followers,
      following: connections.following,
      userId,
    },
  };
};
const fetchUserConnectionsFailed = (error) => {
  return {
    type: actionTypes.FETCH_USER_CONNECTIONS_FAILED,
    payload: {
      error,
    },
  };
};

export const fetchUserConnections = (userId, callback) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserConnectionsStart());
      const response = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.connections}/${userId}`
      );
      callback();
      dispatch(fetchUserConnectionsSuccess(response.data, userId));
    } catch (err) {
      console.log(err);
      callback();
      dispatch(fetchUserConnectionsFailed(err.response.data));
    }
  };
};
