import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  chatList: null,
  loadedChats: {},
  loading: false,
  error: null,
};

const fetchChatListStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
const fetchChatListSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    chatList: action.payload.chatList,
  });
};
const fetchChatListFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};
const fetchChatMessagesStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
const fetchChatMessagesSuccess = (state, action) => {
  const updatedLoadedChats = { ...state.loadedChats };
  const { chatId, messages } = action.payload;
  updatedLoadedChats[chatId] = messages;
  return updateObject(state, {
    loading: false,
    loadedChats: updatedLoadedChats,
  });
};
const fetchChatMessagesFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const chatMessageReceived = (state, action) => {
  const { chatId, messageObject } = action.payload;
  const updatedLoadedChats = { ...state.loadedChats };
  if (updatedLoadedChats[chatId]) {
    updatedLoadedChats[chatId].push(messageObject);
  } else {
    updatedLoadedChats[chatId] = [messageObject];
  }
  return updateObject(state, { loadedChats: updatedLoadedChats });
};
const chatMessageSent = (state, action) => {
  const { chatId, messageObject } = action.payload;
  const updatedLoadedChats = { ...state.loadedChats };
  if (updatedLoadedChats[chatId]) {
    updatedLoadedChats[chatId].push(messageObject);
  } else {
    updatedLoadedChats[chatId] = [messageObject];
  }
  return updateObject(state, { loadedChats: updatedLoadedChats });
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHAT_LIST_START:
      return fetchChatListStart(state, action);
    case actionTypes.FETCH_CHAT_LIST_SUCCESS:
      return fetchChatListSuccess(state, action);
    case actionTypes.FETCH_CHAT_LIST_FAILED:
      return fetchChatListFailed(state, action);
    case actionTypes.FETCH_CHAT_MESSAGES_START:
      return fetchChatMessagesStart(state, action);
    case actionTypes.FETCH_CHAT_MESSAGES_SUCCESS:
      return fetchChatMessagesSuccess(state, action);
    case actionTypes.FETCH_CHAT_MESSAGES_FAILED:
      return fetchChatMessagesFailed(state, action);
    case actionTypes.CHAT_MESSAGE_RECEIVED:
      return chatMessageReceived(state, action);
    case actionTypes.CHAT_MESSAGE_SENT:
      return chatMessageSent(state, action);
    default:
      return state;
  }
};

export default chatReducer;
