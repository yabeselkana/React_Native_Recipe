import { applyMiddleware, createReducer } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import thunk from "redux-thunk";

const store = createReducer(rootReducer, applyMiddleware(thunk));

export default store;
