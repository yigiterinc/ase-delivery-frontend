import http from "../services/http-common";

const getAllDeliveries = () => {
	return http.get("/deliveries");
};

const getDeliverybyId = (id) => {
	return http.get(`/deliveries/${id}`);
};

const getActiveDeliveriesByCustomerId = (customerId) => {
	return http.get(`/customer/${customerId}/status/active`);
};

const getPastDeliveriesByCustomerId = (customerId) => {
	return http.get(`/customer/${customerId}/status/delivered`);
};

const getDeliveryByTrackingId = (trackingId) => {
	return http.get(`/deliveries?trackingId=${trackingId}`);
};

const createDelivery = (data) => {
	return http.post("/deliveries", data);
};

const onDeliveriesCollected = (ids, delivererId) => {
	return http.put(
		`/deliveries/${ids.join(",")}/collected/deliverer/${delivererId}`
	);
};

const onDeliveryDeposited = (deliveryId, delivererId, boxId) => {
	return http.put(
		`/deliveries/${deliveryId}/deposited/deliverer/${delivererId}/box/${boxId}`
	);
};

const onDeliveryDelivered = (userId, boxId) => {
	return http.put(`/deliveries/user/${userId}/delivered/box/${boxId}`);
};

const removeDelivery = (id) => {
	return http.delete(`/deliveries/${id}`);
};

const deliveryService = {
	getAllDeliveries,
	getDeliverybyId,
	getActiveDeliveriesByCustomerId,
	getPastDeliveriesByCustomerId,
	//getDeliveryByTrackingId,
	createDelivery,
	onDeliveriesCollected,
	onDeliveryDeposited,
	onDeliveryDelivered,
	removeDelivery,
};

export default deliveryService;
