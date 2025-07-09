import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "./slice/users.slice";

const rootReducer = combineReducers({
  userData: userDataReducer,
});

export default rootReducer;
