import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  posts: [],
  loading: false,
  error: null
};

const fetchPostsStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchPostsSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.payload.postData,
    loading: false
  });
};
const fetchPostsFailed = (state, action) => {
  return updateObject(state, { error: action.payload.error, loading: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_START:
      return fetchPostsStart(state, action);
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionTypes.FETCH_POSTS_FAILED:
      return fetchPostsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
