import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:8080/api/ds",
	headers: {
		"Content-type": "application/json",
	},
});
