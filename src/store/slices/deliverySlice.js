import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeliveryDataService from "../../services/deliveryService";

const initialState = {
  allDeliveries: [],
  userActiveDeliveries: [],
  userPastDeliveries: [],
  delivererAssignedDeliveries: [],
};

export const createDelivery = createAsyncThunk(
  "deliveries/createDelivery",
  async ({ boxId, customerId, delivererId }) => {
    const res = await DeliveryDataService.createDelivery({
      boxId,
      customerId,
      delivererId,
    });

    return res.data;
  }
);

export const getDeliverybyId = createAsyncThunk(
  "deliveries/getDeliveryById",
  async ({ id }) => {
    const res = await DeliveryDataService.getDeliveryById(id);
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
  "deliveries/getActiveDeliveriesOfCustomer",
  async ({ id }) => {
    const res = await DeliveryDataService.getActiveDeliveriesOfCustomer(id);
    return res.data;
  }
);

export const getPastDeliveriesByCustomerId = createAsyncThunk(
  "deliveries/getPastDeliveriesOfCustomer",
  async ({ id }) => {
    const res = await DeliveryDataService.getPastDeliveriesOfCustomer(id);
    return res.data;
  }
);

export const getDeliveriesAssignedToDeliverer = createAsyncThunk(
  "deliveries/getDeliveriesOfDeliverer",
  async ({ id }) => {
    const res = await getDeliveriesAssignedToDeliverer(id);
    return res.data;
  }
);

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
    const res = await DeliveryDataService.onDeliveryDeposited(
      delivererId,
      boxId
    );
    return res.data;
  }
);

export const onDeliveryDelivered = createAsyncThunk(
  "deliveries/onDeliveryDelivered",
  async ({ userId, boxId }) => {
    const res = await DeliveryDataService.onDeliveryDelivered(userId, boxId);
    return res.data;
  }
);

export const deleteDelivery = createAsyncThunk(
  "deliveries/deleteDelivery",
  async ({ id }) => {
    const res = await DeliveryDataService.deleteDelivery(id);
    return res.data;
  }
);

const deliverySlice = createSlice({
  name: "deliveries",
  initialState,
  extraReducers: {
    [createDelivery.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getDeliveries.fulfilled]: (state, action) => {
      return {
        ...state,
        allDeliveries: action.payload,
      };
    },
    [getActiveDeliveriesByCustomerId.fulfilled]: (state, action) => {
      return {
        ...state,
        userActiveDeliveries: action.payload,
      };
    },
    [getPastDeliveriesByCustomerId.fulfilled]: (state, action) => {
      return {
        ...state,
        userPastDeliveries: action.payload,
      };
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

export default deliverySlice.reducer;
