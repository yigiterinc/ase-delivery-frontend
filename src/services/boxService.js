import http from "http-common";

const getAll = () => {
	return http.get("/boxes");
};

const get = (id) => {
	return http.get(`/boxes/${id}`);
};

const create = (data) => {
	return http.post("/boxes", data);
};

const update = (id, data) => {
	return http.put(`/boxes/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/boxes/${id}`);
};

const removeAll = () => {
	return http.delete(`/boxes`);
};

const findByTitle = (title) => {
	return http.get(`/boxes?title=${title}`);
};

const boxService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByTitle,
};

export default boxService;
