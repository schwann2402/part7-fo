import { createSlice } from "@reduxjs/toolkit";
import UserService from "../services/users";

const userReducer = createSlice({
  name: "login",
  initialState: {
    actualUser: {
      name: "",
      id: "",
      token: "",
    },
    users: [],
  },
  reducers: {
    setUser(state, action) {
      state.actualUser = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await UserService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUser, setUsers } = userReducer.actions;
export default userReducer.reducer;
