import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Spinner,
	Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { loginPending, loginSuccess, loginFail } from "../../store/slices/loginSlice";
import { getUserProfile } from "../../store/actions/userAction";
import {fetchRoleByToken, login} from "../../services/userService";

export const LoginForm = ({ formSwitcher }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	let location = useLocation();

	const { isLoading, isAuth, error } = useSelector(state => state.login);
	let { from } = location.state || { from: { pathname: "/" } };

	useEffect(() => {
		localStorage.getItem("jwToken") && history.replace(from);
	}, [history, isAuth]);

	const [email, setEmail] = useState("yigit.erinc@tum.de");
	const [password, setPassword] = useState("test123");

	const handleOnChange = e => {
		const { name, value } = e.target;

		switch (name) {
			case "email":
				setEmail(value);
				break;

			case "password":
				setPassword(value);
				break;

			default:
				break;
		}
	};

	const handleOnSubmit = async e => {
		e.preventDefault();

		if (!email || !password) {
			return alert("Email and Password required!");
		}

		dispatch(loginPending());

		try {
			const token = await login({ email, password });
			const role = await fetchRoleByToken(token)

			localStorage.setItem("jwToken", token);
			localStorage.setItem("ROLE", role)

			if (token.status === "error") {
				return dispatch(loginFail("LOGIN FAILED", token));
			}

			dispatch(loginSuccess());
			dispatch(getUserProfile());
			history.push("/dashboard");
		} catch (error) {
			dispatch(loginFail(error.message));
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<h3 className="text-info text-center">Login</h3>
					<Form autoComplete="off" onSubmit={handleOnSubmit}>
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={email}
								onChange={handleOnChange}
								placeholder="Email Address"
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								onChange={handleOnChange}
								value={password}
								placeholder="Password"
								required
							/>
						</Form.Group>
						{error && <Alert variant="danger">{error}</Alert>}
						<div className="text-center" >
							<Button type="submit">Login</Button></div>
						{isLoading && <Spinner variant="primary" animation="border" />}
					</Form>
				</Col>
			</Row>

		</Container>
	);
};

LoginForm.propTypes = {
	formSwitcher: PropTypes.func.isRequired,
};
