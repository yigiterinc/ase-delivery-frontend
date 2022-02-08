import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserDataService from "../../services/userService";
import {useHistory} from "react-router-dom";

const initialState = {
  user: {},
  isLoading: false,
  error: "",
};

export const createUser = createAsyncThunk(
    "user/create",
    async ({ email, password, role }) => {
      const res = await UserDataService.createUser({ email, password, role });
      return res.data;
    }
);

export const getAllUsers = createAsyncThunk("/user/all", async () => {
  const res = await UserDataService.getAllUsers();
  return res.data;
});

export const getUserById = createAsyncThunk("user/getById", async ({ id }) => {
  const res = await UserDataService.getUserById(id);
  return res.data;
});

export const getUserRole = createAsyncThunk("user/getUserRole", async ({ id }) => {
  const res = await UserDataService.getUserRole(id);
  return res.data;
});

export const deleteUserById = createAsyncThunk("user/deleteUserById", async ({ id }) => {
  const res = await UserDataService.deleteUser(id);
  return res.data;
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  getUserPending,
  getUserSuccess,
  getUserFail,
} = userSlice.actions;

export default userSlice.reducer;
