import { combineReducers } from "@reduxjs/toolkit";
import storeData from "../pages/store/index";
import error from "./error/store";


const createReducer = (asyncReducers) => (state, action) => {
	const combinedReducer = combineReducers({
		storeData: storeData,
		error,
		...asyncReducers,
	});
	return combinedReducer(state, action);
};

export default createReducer;
