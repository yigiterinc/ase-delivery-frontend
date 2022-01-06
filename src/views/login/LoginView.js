import React, { useState } from "react";

import { Jumbotron } from "react-bootstrap";
import { LoginForm } from "../../components/login/Login.js";

import "./LoginView.css";
import {
	Container,
	Row,
	Col
} from "react-bootstrap";
export const LoginView = () => {
	const [frmLoad, setFrmLoad] = useState("login");

	const formSwitcher = frmType => {
		setFrmLoad(frmType);
	};

	return (
		<div className="login">
			<Container>
				<Row>
					<Col className="md-8">
						<div className="paddingTop25">
							<h2>ASE Delivery System</h2>
							<p>Brief information about ASE Delivery System will go here...</p></div>
					</Col>
					<Col className="md-4">
						<Jumbotron className="form-box">
							{frmLoad === "login" && <LoginForm formSwitcher={formSwitcher} />}

						</Jumbotron></Col>
				</Row>
			</Container>
		</div>
	);
};
