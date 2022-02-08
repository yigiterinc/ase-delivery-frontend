import axios from "axios";
import {authHeader} from "../helpers";

const client = axios.create({
	baseURL: "http://localhost:10789/api",
	headers: {
		"Content-type": "application/json",
		"Authorization": authHeader(),
	},
});

export default client;