import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/employeeReducer";

const rootReducer = combineReducers({
  employee: employeeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
