import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./rootReducer";
import errorMiddleware from "./error/middleware/errorMiddleware";

const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware),
});

store.asyncReducers = {}

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

export default store;
