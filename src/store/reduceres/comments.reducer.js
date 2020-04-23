import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loadedComments: {},
  loading: false,
  error: null,
};

const commentsFetchStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const commentsFetchSuccess = (state, action) => {
  const postId = action.payload.postId;
  const updatedComments = { ...state.loadedComments };
  updatedComments[postId] = action.payload.commentData;
  return updateObject(state, {
    loadedComments: updatedComments,
    loading: false,
  });
};

const commentsFetchFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error,
  });
};
const commentPostStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};
const commentPostSuccess = (state, action) => {
  const postId = action.payload.postId;
  const updatedComments = { ...state.loadedComments };
  updatedComments[postId] = action.payload.commentData;

  return updateObject(state, {
    loading: false,
    loadedComments: updatedComments,
  });
};
const commentPostFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENTS_FETCH_START:
      return commentsFetchStart(state, action);
    case actionTypes.COMMENTS_FETCH_SUCCESS:
      return commentsFetchSuccess(state, action);
    case actionTypes.COMMENTS_FETCH_FAILED:
      return commentsFetchFailed(state, action);
    case actionTypes.COMMENT_POST_START:
      return commentPostStart(state, action);
    case actionTypes.COMMENT_POST_SUCCESS:
      return commentPostSuccess(state, action);
    case actionTypes.COMMENT_POST_FAILED:
      return commentPostFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
