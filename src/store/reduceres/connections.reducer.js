import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  followers: null,
  following: null,
  error: null,
  userConnectionsMap: {},
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
  const updatedUserConnectionsMap = { ...state.userConnectionsMap };
  const { following, userId, loggedInUser } = action.payload;
  if (updatedUserConnectionsMap[userId]) {
    updatedUserConnectionsMap[userId].followers = [
      {
        _id: Date.now().toString(),
        user: {
          id: loggedInUser.id,
          name: loggedInUser.name,
          avatar: loggedInUser.avatar,
        },
      },
    ].concat(updatedUserConnectionsMap[userId].followers);
  }
  return updateObject(state, {
    following: following,
    userConnectionsMap: updatedUserConnectionsMap,
  });
};
const followUserFailed = (state, action) => {
  return updateObject(state, { error: action.payload.error });
};

const unfollowUserStart = (state, action) => {
  return updateObject(state, { error: null });
};
const unfollowUserSuccess = (state, action) => {
  const { following, userId, loggedInUser } = action.payload;
  let updatedUserConnectionsMap = { ...state.userConnectionsMap };
  if (updatedUserConnectionsMap[userId]) {
    const unfollowUserIndex = updatedUserConnectionsMap[userId].followers
      .map((follower) => follower.user.id)
      .indexOf(loggedInUser.id);
    updatedUserConnectionsMap[userId].followers.splice(unfollowUserIndex, 1);
  }
  return updateObject(state, {
    following: following,
    userConnectionsMap: updatedUserConnectionsMap,
  });
};
const unfollowUserFailed = (state, action) => {
  return updateObject(state, { error: action.payload.error });
};

const fetchUserConnectionsStart = (state, action) => {
  return updateObject(state, { error: null });
};
const fetchUserConnectionsSuccess = (state, action) => {
  const updatedUserConnectionsMap = { ...state.userConnectionsMap };
  const { userId, followers, following } = action.payload;
  updatedUserConnectionsMap[userId] = { followers, following };
  return updateObject(state, { userConnectionsMap: updatedUserConnectionsMap });
};
const fetchUserConnectionsFailed = (state, action) => {
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
    case actionTypes.FETCH_USER_CONNECTIONS_START:
      return fetchUserConnectionsStart(state, action);
    case actionTypes.FETCH_USER_CONNECTIONS_SUCCESS:
      return fetchUserConnectionsSuccess(state, action);
    case actionTypes.FETCH_USER_CONNECTIONS_FAILED:
      return fetchUserConnectionsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
