import * as actionTypes from "./actionTypes";
import { loadConnections } from "./actions";
import { setAuthorizationToken } from "../../shared/utility";
import io from "socket.io-client";
import axios from "axios";
import config from "../../config/app-config.json";

const registrationStart = () => {
  return {
    type: actionTypes.REGISTRATION_START,
  };
};

const registrationSuccess = (token, socket) => {
  return {
    type: actionTypes.REGISTRATION_SUCCESS,
    payload: {
      token,
      socket,
    },
  };
};

const registrationFailed = (error) => {
  return {
    type: actionTypes.REGISTRATION_FAILED,
    payload: {
      error: error,
    },
  };
};

export const register = (name, email, password, callback) => {
  return async (dispatch) => {
    try {
      dispatch(registrationStart());
      const registrationdata = {
        name: name,
        email: email,
        password: password,
      };

      const result = await axios.post(
        `${config.api.baseURL}/${config.api.endPoints.users}`,
        registrationdata
      );
      localStorage.setItem("jwtToken", result.data.token);
      const socket = io(`${config.socket}`, {
        transports: ["websocket"],
      });
      callback(null);
      dispatch(registrationSuccess(result.data.token, socket));
      dispatch(fetchUser(result.data.token, socket));
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      callback(err.response.data.errors[0].msg);
      dispatch(registrationFailed(err.response.data.errors[0].msg));
    }
  };
};

const fetchUserDetailsStart = () => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_START,
  };
};
const fetchUserDetailsSuccess = (userData, socket) => {
  socket.emit("CONNECTED_USER", userData._id);
  return {
    type: actionTypes.FETCH_USER_DETAILS_SUCCESS,
    payload: {
      name: userData.name,
      id: userData._id,
      email: userData.email,
      avatar: userData.avatar,
      following: userData.following,
      followers: userData.followers,
      chats: userData.chats,
      session: userData.session,
    },
  };
};
const fetchUserDetailsFailed = (error) => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_FAILED,
    payload: {
      error: error,
    },
  };
};

export const fetchUser = (token, socket) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserDetailsStart());
      setAuthorizationToken(token);
      const result = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.auth}`
      );
      dispatch(fetchUserDetailsSuccess(result.data, socket));
      dispatch(loadConnections(result.data.followers, result.data.following));
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      dispatch(fetchUserDetailsFailed(err.response.data.errors[0].msg));
    }
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (token, socket) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      socket: socket,
    },
  };
};
const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: {
      error: error,
    },
  };
};

export const login = (email, password, setError) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      setAuthorizationToken();
      const loginData = {
        email: email,
        password: password,
      };
      const result = await axios.post(
        `${config.api.baseURL}/${config.api.endPoints.auth}/`,
        loginData
      );
      const socket = io(`${config.socket}`, {
        transports: ["websocket"],
      });
      dispatch(authSuccess(result.data.token, socket));
      dispatch(fetchUser(result.data.token, socket));

      setError(null);
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      dispatch(authFailed(err.response.data.errors[0].msg));
      setError(err.response.data.errors[0].msg);
    }
  };
};

const authLogout = () => {
  localStorage.removeItem("jwtToken");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(authLogout());
  };
};

const changeProfilePictureStart = () => {
  return {
    type: actionTypes.CHANGE_PROFILE_PICTURE_START,
  };
};
const changeProfilePictureSuccess = (avatar) => {
  return {
    type: actionTypes.CHANGE_PROFILE_PICTURE_SUCCESS,
    payload: {
      avatar,
    },
  };
};
const changeProfilePictureFailed = (error) => {
  return {
    type: actionTypes.CHANGE_PROFILE_PICTURE_FAILED,
    payload: {
      error: error,
    },
  };
};

export const changeProfilePicture = (token, profilePicData, callback) => {
  console.log(profilePicData);
  return async (dispatch) => {
    try {
      dispatch(changeProfilePictureStart());
      setAuthorizationToken(token);
      const response = await axios.post(
        `${config.api.baseURL}/${config.api.endPoints.users}/change-profile-pic/`,
        profilePicData
      );
      if (callback) callback();
      dispatch(changeProfilePictureSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(changeProfilePictureFailed(err.response.data));
    }
  };
};

const githubSignUpStart = () => {
  return {
    type: actionTypes.GITHUB_SIGNUP_START,
  };
};
const githubSignUpSuccess = (token, socket) => {
  return {
    type: actionTypes.GITHUB_SIGNUP_SUCCESS,
    payload: { token, socket },
  };
};
const githubSignUpFailed = (error) => {
  return {
    type: actionTypes.GITHUB_SIGNUP_FAILED,
    payload: { error },
  };
};
export const githubSignUpCancelled = () => {
  return {
    type: actionTypes.GITHUB_SIGNUP_CANCELLED,
  };
};

export const githubSignUp = (username, password, code, token) => {
  return async (dispatch) => {
    try {
      dispatch(githubSignUpStart());
      const response = await axios.post(
        `${config.api.baseURL}/${config.api.endPoints.github}/signup`,
        {
          username,
          password,
          code,
          token,
        }
      );
      const socket = io(`${config.socket}`, {
        transports: ["websocket"],
      });
      dispatch(githubSignUpSuccess(response.data.token, socket));
      dispatch(fetchUser(response.data.token, socket));
    } catch (err) {
      console.log(err);
      dispatch(githubSignUpFailed(err.response.data));
    }
  };
};
const githubLoginStart = () => {
  return {
    type: actionTypes.GITHUB_LOGIN_START,
  };
};
const githubLoginSuccess = (token, socket) => {
  return {
    type: actionTypes.GITHUB_LOGIN_SUCCESS,
    payload: { token, socket },
  };
};
const githubLoginFailed = (error) => {
  const { githubToken } = error;
  return {
    type: actionTypes.GITHUB_LOGIN_FAILED,
    payload: {
      error: githubToken ? error.errors[0].msg : error,
      githubToken: githubToken,
    },
  };
};

export const githubLogin = (code) => {
  return async (dispatch) => {
    try {
      dispatch(githubLoginStart());
      const response = await axios.post(
        `${config.api.baseURL}/${config.api.endPoints.github}/login`,
        { code: code }
      );
      const socket = io(`${config.socket}`, {
        transports: ["websocket"],
      });
      dispatch(githubLoginSuccess(response.data.token, socket));
      dispatch(fetchUser(response.data.token, socket));
    } catch (err) {
      console.log(err);
      dispatch(githubLoginFailed(err.response.data));
    }
  };
};
