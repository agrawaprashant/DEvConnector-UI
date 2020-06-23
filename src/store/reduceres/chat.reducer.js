import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { createChat } from "../../shared/chat.utilities";

const initialState = {
  chatList: null,
  loadedChats: {},
  loading: false,
  error: null,
  lastActiveMap: {},
  selectedChat: null,
  selectedContact: null,
};

const selectChat = (state, action) => {
  const { chatId, contact } = action.payload;
  return updateObject(state, {
    selectedChat: chatId,
    selectedContact: contact,
  });
};
const selectContact = (state, action) => {
  const { contact } = action.payload;
  return updateObject(state, {
    selectedChat: null,
    selectedContact: contact,
  });
};
const unSelectChat = (state, action) => {
  return updateObject(state, {
    selectedChat: null,
    selectedContact: null,
  });
};
const unSelectContact = (state, action) => {
  return updateObject(state, {
    selectedChat: null,
    selectedContact: null,
  });
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
  const { chatId, messageObject, sender } = action.payload;
  const updatedLoadedChats = { ...state.loadedChats };
  let updatedChatList = [...state.chatList];
  if (updatedLoadedChats[chatId]) {
    updatedLoadedChats[chatId].push(messageObject);
  }
  let updatedChat = updatedChatList.find((chat) => {
    return chat._id === chatId;
  });
  if (updatedChat) {
    const updatedChatIndex = updatedChatList.indexOf(updatedChat);
    updatedChat.lastMessage = messageObject.messageText;
    updatedChat.unreadMessageCount = updatedChat.unreadMessageCount + 1;
    updatedChat.lastMessageDate = new Date();
    updatedChatList.splice(updatedChatIndex, 1);
    updatedChatList = [updatedChat].concat(updatedChatList);
  } else {
    updatedChat = createChat(chatId, messageObject.messageText, sender);
    updatedChat.unreadMessageCount = 1;
    updatedChatList = [updatedChat].concat(updatedChatList);
  }
  return updateObject(state, {
    loadedChats: updatedLoadedChats,
    chatList: updatedChatList,
  });
};
const chatMessageSent = (state, action) => {
  const { chatId, messageObject, receiver, messageType } = action.payload;

  const updatedLoadedChats = { ...state.loadedChats };
  let updatedChatList = [...state.chatList];
  if (updatedLoadedChats[chatId]) {
    updatedLoadedChats[chatId].push(messageObject);
  } else {
    if (messageType !== "profile") {
      updatedLoadedChats[chatId] = [messageObject];
    }
  }
  let updatedChat = updatedChatList.find((chat) => {
    return chat._id === chatId;
  });
  if (updatedChat) {
    const updatedChatIndex = updatedChatList.indexOf(updatedChat);
    updatedChat.lastMessage = messageObject.messageText;
    updatedChat.lastMessageDate = new Date();
    updatedChatList.splice(updatedChatIndex, 1);
    updatedChatList = [updatedChat].concat(updatedChatList);
  } else {
    updatedChat = createChat(chatId, messageObject.messageText, receiver);
    updatedChatList = [updatedChat].concat(updatedChatList);
  }
  return updateObject(state, {
    loadedChats: updatedLoadedChats,
    chatList: updatedChatList,
  });
};

const chatMessageSeenSent = (state, action) => {
  const { chatId } = action.payload;
  const updatedChatList = [...state.chatList];
  const updatedChat = updatedChatList.find((chat) => chat._id === chatId);
  updatedChat.unreadMessageCount = 0;
  const updatedChatIndex = updatedChatList.indexOf(updatedChat);
  updatedChatList[updatedChatIndex] = updatedChat;
  return updateObject(state, {
    chatList: updatedChatList,
  });
};

const chatMessageSeenReceived = (state, action) => {
  const { chatId, seenReceiver } = action.payload;
  const updatedLoadedChats = { ...state.loadedChats };
  if (updatedLoadedChats[chatId]) {
    updatedLoadedChats[chatId].forEach((message) => {
      if (message.sender === seenReceiver) {
        message.isMessageSeen = true;
      }
    });
    return updateObject(state, {
      loadedChats: updatedLoadedChats,
    });
  }
  return state;
};

const fetchLastActiveStart = (state, action) => {
  return updateObject(state, { error: null });
};

const fetchLastActiveSuccess = (state, action) => {
  const updatedLastActiveMap = { ...state.lastActiveMap };
  const { lastActive, userId } = action.payload;
  updatedLastActiveMap[userId] = lastActive;
  return updateObject(state, { lastActiveMap: updatedLastActiveMap });
};

const fetchLastActiveFailed = (state, action) => {
  return updateObject(state, { error: action.payload.error });
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_CHAT:
      return selectChat(state, action);
    case actionTypes.SELECT_CONTACT:
      return selectContact(state, action);
    case actionTypes.UNSELECT_CHAT:
      return unSelectChat(state, action);
    case actionTypes.UNSELECT_CONTACT:
      return unSelectContact(state, action);
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
    case actionTypes.FETCH_LAST_ACTIVE_START:
      return fetchLastActiveStart(state, action);
    case actionTypes.FETCH_LAST_ACTIVE_SUCCESS:
      return fetchLastActiveSuccess(state, action);
    case actionTypes.FETCH_LAST_ACTIVE_FAILED:
      return fetchLastActiveFailed(state, action);
    case actionTypes.CHAT_MESSAGE_SEEN_SENT:
      return chatMessageSeenSent(state, action);
    case actionTypes.CHAT_MESSAGE_SEEN_RECEIVED:
      return chatMessageSeenReceived(state, action);
    case actionTypes.AUTH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default chatReducer;
