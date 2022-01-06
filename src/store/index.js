import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";


const store = configureStore({
	reducer: {
		login: loginReducer,
		user: userReducer
	},
});

export default store;
