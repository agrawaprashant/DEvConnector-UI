import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  followers: null,
  following: null,
  error: null,
};

const loadConnections = (state, action) => {
  return updateObject(state, {
    followers: action.payload.followers,
    following: action.payload.following,
  });
};

const followUserStart = (state, action) => {
  return updateObject(state, { error: null });
};
const followUserSuccess = (state, action) => {
  return updateObject(state, { following: action.payload.following });
};
const followUserFailed = (state, action) => {
  return updateObject(state, { error: action.payload.error });
};

const unfollowUserStart = (state, action) => {
  return updateObject(state, { error: null });
};
const unfollowUserSuccess = (state, action) => {
  return updateObject(state, { following: action.payload.following });
};
const unfollowUserFailed = (state, action) => {
  return updateObject(state, { error: action.payload.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CONNECTIONS:
      return loadConnections(state, action);
    case actionTypes.FOLLOW_USER_START:
      return followUserStart(state, action);
    case actionTypes.FOLLOW_USER_SUCCESS:
      return followUserSuccess(state, action);
    case actionTypes.FOLLOW_USER_FAILED:
      return followUserFailed(state, action);
    case actionTypes.UNFOLLOW_USER_START:
      return unfollowUserStart(state, action);
    case actionTypes.UNFOLLOW_USER_SUCCESS:
      return unfollowUserSuccess(state, action);
    case actionTypes.UNFOLLOW_USER_FAILED:
      return unfollowUserFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
