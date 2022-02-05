import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BoxDataService from "../../services/boxService";

const initialState = [];

export const createBox = createAsyncThunk(
	"boxes/create",
	async ({ name, data }) => {
		const res = await BoxDataService.create({ name, data });
		return res.data;
	}
);

export const getBox = createAsyncThunk("boxes/getById", async ({ id }) => {
	const res = await BoxDataService.get(id);
	return res.data;
});

export const getBoxes = createAsyncThunk("/boxes/all", async () => {
	const res = await BoxDataService.getAll();
	return res.data;
});

export const updateBox = createAsyncThunk(
	"boxes/updateById",
	async ({ id, data }) => {
		const res = await BoxDataService.update(id, data);
		return res.data;
	}
);

export const deleteBox = createAsyncThunk(
	"boxes/deleteById",
	async ({ id }) => {
		await BoxDataService.remove(id);
		return { id };
	}
);

// export const deleteAllBoxes = createAsyncThunk("boxes/deleteAll", async () => {
// 	const res = await BoxDataService.removeAll();
// 	return res.data;
// });

export const getBoxByDelivererId = createAsyncThunk(
	"boxes/getByDelivererId",
	async ({ delivererId }) => {
		const res = await BoxDataService.getByDelivererId(delivererId);
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
			const index = state.findIndex(
				(box) => box.id === action.payload.id
			);
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
