import React, {useState, useEffect, useCallback} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

import {getLoggedInUser, userActions} from "../../store/actions/userAction";

export const LoginForm = ({ formSwitcher }) => {
	const dispatch = useDispatch();

	let location = useLocation();

	const history = useHistory();

	const [loggedInUser, setLoggedInUser] = useState(null);
	const [email, setEmail] = useState("yigit.erinc@tum.de");
	const [password, setPassword] = useState("test123");

	let { from } = location.state || { from: { pathname: "/" } };

	useEffect(() => {
		if (loggedInUser) {
			history.push("/dashboard")
			return;
		}

		window.addEventListener('storage', storageEventHandler, false);
	}, [loggedInUser]);


	useEffect(() => {
		console.log('hello')
		if (loggedInUser) {
			history.push("/dashboard")
		}
	}, [location.pathname])

	function storageEventHandler() {
		console.log("hi from storageEventHandler")
		setLoggedInUser(localStorage.getItem('user') || null)
	}

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

		dispatch(userActions.login(email, password));
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
						{/* {error && <Alert variant="danger">{error}</Alert>} */}
						<div className="text-center" >
							<Button type="submit">Login</Button>
						</div>
						{/* {isLoading && <Spinner variant="primary" animation="border" />} */}
					</Form>
				</Col>
			</Row>

		</Container>
	);
};

LoginForm.propTypes = {
	formSwitcher: PropTypes.func.isRequired,
};
