import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "./slice/users.slice";
import teachersDataReducer from "./slice/teachers.slice";

const rootReducer = combineReducers({
  userData: userDataReducer,
  teachersData: teachersDataReducer,
});

export default rootReducer;
