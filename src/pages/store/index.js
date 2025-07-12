import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "./slice/users.slice";
import teachersDataReducer from "./slice/teachers.slice";
import studentsDataReducer from "./slice/students.slice";

const rootReducer = combineReducers({
  userData: userDataReducer,
  teachersData: teachersDataReducer,
  studentsData: studentsDataReducer,
});

export default rootReducer;
