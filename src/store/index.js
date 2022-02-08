import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/loginSlice";
import boxReducer from "./slices/boxSlice";
import deliveryReducer from './slices/deliverySlice'

const reducer = {
	login: loginReducer,
	box: boxReducer,
	delivery: deliveryReducer
}

const store = configureStore({
	reducer: reducer,
  	devTools: true,
});

export default store;

