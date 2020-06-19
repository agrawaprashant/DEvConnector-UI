import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  loading: false,
  error: null,
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
  },
  chats: null,
  following: null,
  followers: null,
  socket: null,
  session: null,
};

const registrationStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const registrationSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    loading: false,
    error: null,
  });
};

const registrationFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const fetchUserDetailsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchUserDetailsSuccess = (state, action) => {
  return updateObject(state, {
    user: {
      name: action.payload.name,
      id: action.payload.id,
      email: action.payload.email,
      avatar: action.payload.avatar,
    },
    chats: action.payload.chats,
    followers: action.payload.followers,
    following: action.payload.following,
    session: action.payload.session,
    loading: false,
    error: null,
  });
};

const fetchUserDetailsFailed = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    socket: action.payload.socket,
    loading: false,
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    user: {
      name: null,
      email: null,
      avatar: null,
      id: null,
    },
    socket: null,
    followers: null,
    following: null,
    chats: null,
  });
};

const changeProfilePicStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
const changeProfilePicSuccess = (state, action) => {
  const updatedUser = { ...state.user };
  const { avatar } = action.payload;
  updatedUser.avatar = avatar;
  return updateObject(state, { loading: false, user: updatedUser });
};
const changeProfilePicFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTRATION_START:
      return registrationStart(state, action);
    case actionTypes.REGISTRATION_SUCCESS:
      return registrationSuccess(state, action);
    case actionTypes.REGISTRATION_FAILED:
      return registrationFailed(state, action);
    case actionTypes.FETCH_USER_DETAILS_START:
      return fetchUserDetailsStart(state, action);
    case actionTypes.FETCH_USER_DETAILS_SUCCESS:
      return fetchUserDetailsSuccess(state, action);
    case actionTypes.FETCH_USER_DETAILS_FAILED:
      return fetchUserDetailsFailed(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.CHANGE_PROFILE_PICTURE_START:
      return changeProfilePicStart(state, action);
    case actionTypes.CHANGE_PROFILE_PICTURE_SUCCESS:
      return changeProfilePicSuccess(state, action);
    case actionTypes.CHANGE_PROFILE_PICTURE_FAILED:
      return changeProfilePicFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
