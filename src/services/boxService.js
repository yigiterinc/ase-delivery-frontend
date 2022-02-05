import http from "../services/http-common";

const getAll = () => {
	return http.get("/boxes/all");
};

const get = (id) => {
	return http.get(`/boxes/${id}`);
};

const getByDelivererId = (delivererId) => {
	return http.get(`/deliverer/${delivererId}`);
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

const boxService = {
	getAll,
	get,
	create,
	update,
	remove,
	getByDelivererId,
};

export default boxService;
