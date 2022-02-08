import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loginSuccess } from "../store/slices/loginSlice";
import {getLoggedInUser, getUserProfile} from "../store/actions/userAction";

import { fetchJWT } from "../api/userApi";

export const SecureRoute = ({ children, allowedRoles, ...rest }) => {
	const dispatch = useDispatch();

	return (
		<Route
			{...rest}
			render={({ location }) =>
			{
				const user = JSON.parse(localStorage.getItem('user'));
				if (!user) {
					console.log('user not found')
					return <Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				}
				else if (allowedRoles.indexOf(user.role) !== -1) {
					return <>{children}</>
				} else {
					console.log('you do not have necessary role to view this page')
					return <Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				}
			}
		}
		/>
	);
};
