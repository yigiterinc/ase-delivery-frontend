import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loginSuccess } from "../store/slices/loginSlice";
import { getUserProfile } from "../store/actions/userAction";

import { fetchJWT } from "../api/userApi";

export const SecureRoute = ({ children, ...rest }) => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		const updateJWT = async () => {
			const result = await fetchJWT();
			result && dispatch(loginSuccess());
		};

		!user._id && dispatch(getUserProfile());

		!sessionStorage.getItem("jwToken") &&
			localStorage.getItem("aseDelivery") &&
			updateJWT();

		!isAuth && sessionStorage.getItem("jwToken") && dispatch(loginSuccess());
	}, [dispatch, isAuth, user._id]);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					<>{children}</>
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
