import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";
import config from "../../config/app-config.json";

export const fetchChatList = (token) => {
  return async (dispatch) => {
    try {
      dispatch(fetchChatListStart());
      setAuthorizationToken(token);
      const response = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.chat}/chat-list`
      );
      dispatch(fetchChatListSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchChatListFailed(err.response.data));
    }
  };
};

const fetchChatListStart = () => {
  return {
    type: actionTypes.FETCH_CHAT_LIST_START,
  };
};

const fetchChatListSuccess = (chatList) => {
  return {
    type: actionTypes.FETCH_CHAT_LIST_SUCCESS,
    payload: {
      chatList,
    },
  };
};

const fetchChatListFailed = (error) => {
  return {
    type: actionTypes.FETCH_CHAT_LIST_FAILED,
    payload: {
      error,
    },
  };
};
export const fetchChatMessages = (token, chatId, callback) => {
  return async (dispatch) => {
    try {
      dispatch(fetchChatMessagesStart());
      setAuthorizationToken(token);
      const response = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.chat}/messages/${chatId}`
      );
      callback();
      dispatch(fetchChatMessagesSuccess(response.data, chatId));
    } catch (err) {
      console.log(err);
      dispatch(fetchChatMessagesFailed(err.response.data));
    }
  };
};

const fetchChatMessagesStart = () => {
  return {
    type: actionTypes.FETCH_CHAT_MESSAGES_START,
  };
};

const fetchChatMessagesSuccess = (messages, chatId) => {
  return {
    type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
    payload: {
      messages,
      chatId,
    },
  };
};

const fetchChatMessagesFailed = (error) => {
  return {
    type: actionTypes.FETCH_CHAT_MESSAGES_FAILED,
    payload: {
      error,
    },
  };
};
export const fetchLastActive = (token, userId) => {
  return async (dispatch) => {
    try {
      dispatch(fetchLastActiveStart());
      setAuthorizationToken(token);
      const response = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.chat}/last-active/${userId}`
      );
      dispatch(fetchLastActiveSuccess(response.data, userId));
    } catch (err) {
      console.log(err);
      dispatch(fetchLastActiveFailed(err.response.data));
    }
  };
};

const fetchLastActiveStart = () => {
  return {
    type: actionTypes.FETCH_LAST_ACTIVE_START,
  };
};

const fetchLastActiveSuccess = (lastActive, userId) => {
  return {
    type: actionTypes.FETCH_LAST_ACTIVE_SUCCESS,
    payload: {
      lastActive,
      userId,
    },
  };
};

const fetchLastActiveFailed = (error) => {
  return {
    type: actionTypes.FETCH_LAST_ACTIVE_FAILED,
    payload: {
      error,
    },
  };
};

export const chatMessageReceived = (chatId, messageObject) => {
  return {
    type: actionTypes.CHAT_MESSAGE_RECEIVED,
    payload: {
      chatId,
      messageObject,
    },
  };
};
export const chatMessageSent = (chatId, messageObject) => {
  return {
    type: actionTypes.CHAT_MESSAGE_SENT,
    payload: {
      chatId,
      messageObject,
    },
  };
};

export const newChatMessageReceived = (chatId, messageText, sender) => {
  return {
    type: actionTypes.NEW_CHAT_MESSAGE_RECEIVED,
    payload: {
      chatId,
      messageText,
      sender,
    },
  };
};

export const newChatMessageSent = (chatId, messageText, receiver) => {
  return {
    type: actionTypes.NEW_CHAT_MESSAGE_SENT,
    payload: {
      chatId,
      messageText,
      receiver,
    },
  };
};
