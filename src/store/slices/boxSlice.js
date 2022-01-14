import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BoxDataService from "../services/boxService";

const initialState = [];

export const createTutorial = createAsyncThunk(
	"boxes/create",
	async ({ title, description }) => {
		const res = await BoxDataService.create({ title, description });
		return res.data;
	}
);

export const retrieveboxes = createAsyncThunk(
	"boxes/retrieve",
	async () => {
		const res = await BoxDataService.getAll();
		return res.data;
	}
);

export const updateTutorial = createAsyncThunk(
	"boxes/update",
	async ({ id, data }) => {
		const res = await BoxDataService.update(id, data);
		return res.data;
	}
);

export const deleteTutorial = createAsyncThunk(
	"boxes/delete",
	async ({ id }) => {
		await BoxDataService.remove(id);
		return { id };
	}
);

export const deleteAllboxes = createAsyncThunk(
	"boxes/deleteAll",
	async () => {
		const res = await BoxDataService.removeAll();
		return res.data;
	}
);

export const findboxesByTitle = createAsyncThunk(
	"boxes/findByTitle",
	async ({ title }) => {
		const res = await BoxDataService.findByTitle(title);
		return res.data;
	}
);

const boxSlice = createSlice({
	name: "box",
	initialState,
	extraReducers: {
		[createBox.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
		[retrieveboxes.fulfilled]: (state, action) => {
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
		[deleteAllBoxes.fulfilled]: (state, action) => {
			return [];
		},
		[findBoxByTitle.fulfilled]: (state, action) => {
			return [...action.payload];
		},
	},
});

const { reducer, actions } = boxSlice;

export default reducer;
