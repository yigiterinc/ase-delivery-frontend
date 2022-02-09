import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserDataService from "../../services/userService";
import {createDelivery} from "./deliverySlice";

const initialState = []

export const createUser = createAsyncThunk(
    "users/createUser",
    async({email, password, role}) => {
        const res = await UserDataService.createUser({email, password, role});
        return res.data
    }
);

export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async () => {
        const res = await UserDataService.getAllUsers();
        return res.data
    }
);

export const deleteUser = createAsyncThunk(
    "/users/deleteUser",
    async (id) => {
        const res = await UserDataService.deleteUser(id);
        return res.data;
    }
);

export const fetchUser = createAsyncThunk(
    "/users/fetchUser",
    async ({jwt}) => {
        const res = await UserDataService.fetchUser(jwt);
        return res.data
    }
)

const userSlice = createSlice( {
    name: "users",
    initialState,
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [getAllUsers.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [deleteUser.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [fetchUser.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    }
})

const { reducer, actions } = userSlice;

export default userSlice.reducer;