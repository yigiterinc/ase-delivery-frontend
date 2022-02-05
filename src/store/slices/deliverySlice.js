import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeliveryDataService from "../../services/deliveryService";

const initialState = [];

export const createDelivery = createAsyncThunk(
	"deliveries/createDelivery",
	async ({ boxId, customerId, delivererId, description }) => {
		const res = await DeliveryDataService.create({
			boxId,
			customerId,
			delivererId,
			description,
		});
		return res.data;
	}
);

export const getDeliverybyId = createAsyncThunk(
	"deliveries/getDeliverybyId",
	async ({ id }) => {
		const res = await DeliveryDataService.getDeliverybyId(id);
		return res.data;
	}
);

export const getDeliveries = createAsyncThunk(
	"/deliveries/getDeliveries",
	async () => {
		const res = await DeliveryDataService.getAllDeliveries();
		return res.data;
	}
);

export const getActiveDeliveriesByCustomerId = createAsyncThunk(
	"deliveries/getActiveDeliveriesByCustomerId",
	async ({ customerId }) => {
		const res = await DeliveryDataService.getActiveDeliveriesByCustomerId(
			customerId
		);
		return res.data;
	}
);

export const getPastDeliveriesByCustomerId = createAsyncThunk(
	"deliveries/getPastDeliveriesByCustomerId",
	async ({ customerId }) => {
		const res = await DeliveryDataService.getPastDeliveriesByCustomerId(
			customerId
		);
		return res.data;
	}
);

// export const getDeliveryByTrackingId = createAsyncThunk(
// 	"deliveries/getDeliveryByTrackingId",
// 	async ({ trackingId }) => {
// 		const res = await DeliveryDataService.getDeliveryByTrackingId(
// 			trackingId
// 		);
// 		return res.data;
// 	}
// );

export const onDeliveriesCollected = createAsyncThunk(
	"deliveries/onDeliveriesCollected",
	async ({ ids, delivererId }) => {
		const res = await DeliveryDataService.onDeliveriesCollected(ids);
		return res.data;
	}
);

export const onDeliveryDeposited = createAsyncThunk(
	"deliveries/onDeliveryDeposited",
	async ({ deliveryId, delivererId, boxId }) => {
		const res = await DeliveryDataService.updateDeliveryStatusDeposited(
			delivererId,
			boxId
		);
		return res.data;
	}
);

export const onDeliveryDelivered = createAsyncThunk(
	"deliveries/onDeliveryDelivered",
	async ({ userId, boxId }) => {
		const res = await DeliveryDataService.updateDeliveryStatusDelivered(
			userId,
			boxId
		);
		return res.data;
	}
);

export const removeDelivery = createAsyncThunk(
	"deliveries/removeDelivery",
	async ({ id }) => {
		await DeliveryDataService.removeDelivery(id);
		return { id };
	}
);

// export const deleteAllDeliveries = createAsyncThunk("deliveries/deleteAll", async () => {
//      const res = await DeliveryDataService.removeAll();
//      return res.data;
// });

const deliverySlice = createSlice({
	name: "deliveries",
	initialState,
	extraReducers: {
		[createDelivery.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
		[getDeliveries.fulfilled]: (state, action) => {
			return [...action.payload];
		},
		[getActiveDeliveriesByCustomerId.fulfilled]: (state, action) => {
			return [...action.payload];
		},
		[getPastDeliveriesByCustomerId.fulfilled]: (state, action) => {
			return [...action.payload];
		},
		[onDeliveriesCollected.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(delivery) => delivery.id === action.payload.id
			);
			state[index] = {
				...state[index],
				...action.payload,
			};
		},
		[onDeliveryDeposited.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(delivery) => delivery.id === action.payload.id
			);
			state[index] = {
				...state[index],
				...action.payload,
			};
		},
		[onDeliveryDelivered.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(delivery) => delivery.id === action.payload.id
			);
			state[index] = {
				...state[index],
				...action.payload,
			};
		},
		[deleteDelivery.fulfilled]: (state, action) => {
			let index = state.findIndex(({ id }) => id === action.payload.id);
			state.splice(index, 1);
		},

		[getDeliverybyId.fulfilled]: (state, action) => {
			return [...action.payload];
		},
	},
});

const { reducer, actions } = deliverySlice;

export default reducer;
