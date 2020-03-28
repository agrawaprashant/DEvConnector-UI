import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./reduceres/auth.reducer";
import postReducer from "./reduceres/post.reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  post: postReducer,
  auth: authReducer
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
