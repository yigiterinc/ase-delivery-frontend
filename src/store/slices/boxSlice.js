import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BoxDataService from "../../services/boxService";

const initialState = [];

export const createBox = createAsyncThunk(
  "boxes/create",
  async ({ stationName, stationAddress }) => {
    const res = await BoxDataService.createBox({ stationName, stationAddress });
    return res.data;
  }
);

export const getBox = createAsyncThunk("boxes/getById", async ({ id }) => {
  const res = await BoxDataService.getBoxById(id);
  return res.data;
});

export const getBoxes = createAsyncThunk("/boxes/all", async () => {
  const res = await BoxDataService.getAllBoxes();
  return res.data;
});

export const updateBox = createAsyncThunk(
  "boxes/updateById",
  async ({ id, data }) => {
    const res = await BoxDataService.updateBox(id, data);
    return res.data;
  }
);

export const deleteBox = createAsyncThunk(
  "boxes/deleteById",
  async ({ id }) => {
    console.log(id);
    await BoxDataService.deleteBox(id);
    return { id };
  }
);

export const getBoxByDelivererId = createAsyncThunk(
  "boxes/getByDelivererId",
  async ({ delivererId }) => {
    const res = await BoxDataService.getBoxByDelivererId(delivererId);
    return res.data;
  }
);

const boxSlice = createSlice({
  name: "boxes",
  initialState,
  extraReducers: {
    [createBox.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getBoxes.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateBox.fulfilled]: (state, action) => {
      const index = state.findIndex((box) => box.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteBox.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [getBoxByDelivererId.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [getBox.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer, actions } = boxSlice;

export default reducer;
