import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BoxDataService from "../../services/boxService";

const initialState = [];

export const createBox = createAsyncThunk(
	"boxes/create",
	async ({ name, address }) => {
		const res = await BoxDataService.create({ name, address });
		return res.data;
	}
);

export const getBox = createAsyncThunk("boxes/findByTitle", async ({ id }) => {
	const res = await BoxDataService.get(id);
	return res.data;
});

export const retrieveBoxes = createAsyncThunk("/boxes/all", async () => {
	const res = await BoxDataService.getAll();
	return res.data;
});

export const updateBox = createAsyncThunk(
	"boxes/update",
	async ({ id, data }) => {
		const res = await BoxDataService.update(id, data);
		return res.data;
	}
);

export const deleteBox = createAsyncThunk("boxes/delete", async ({ id }) => {
	await BoxDataService.remove(id);
	return { id };
});

// export const deleteAllBoxes = createAsyncThunk("boxes/deleteAll", async () => {
// 	const res = await BoxDataService.removeAll();
// 	return res.data;
// });

export const getBoxByDelivererId = createAsyncThunk(
	"boxes/findByTitle",
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
		[retrieveBoxes.fulfilled]: (state, action) => {
			return [...action.payload];
		},
		[updateBox.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(tutorial) => tutorial.id === action.payload.id
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
		// [deleteAllBoxes.fulfilled]: (state, action) => {
		// 	return [];
		// },
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
