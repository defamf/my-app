import { combineReducers } from "redux";
import tracksReducer from "./Tracks/reducers";

const appReducer = combineReducers({
  tracksReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
