import { configureStore, current } from "@reduxjs/toolkit";
import notificationReducer from "./src/reducers/notificationReducer.js";
import blogReducer from "./src/reducers/blogReducer.js";
import { useSelector } from "react-redux";
import userReducer from "./src/reducers/userReducer.js";

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    login: userReducer,
  },
});

export default store;
