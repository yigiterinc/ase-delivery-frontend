import http from "../services/http-common";

const getAllDeliveries = () => {
	return http.get("/deliveries/all");
};

const getDeliverybyId = (id) => {
	return http.get(`/deliveries/${id}`);
};

const getActiveDeliveriesByCustomerId = (custormerId) => {
	return http.get(`/deliveries/active?custormerId=${custormerId}`);
};

const getPastDeliveriesByCustomerId = (custormerId) => {
	return http.get(`/deliveries/past?custormerId=${custormerId}`);
};

const getDeliveryByTrackingId = (trackingId) => {
	return http.get(`/deliveries?trackingId=${trackingId}`);
};

const createDelivery = (data) => {
	return http.post("/deliveries", data);
};

const updateDeliveryStatusCollected = (ids) => {
	return http.put(`/deliveries/${ids.join(",")}`);
};

const updateDeliveryStatusDeposited = (delivererId, boxId) => {
	return http.put(
		`/deliveries/deposited?delivererId=${delivererId}&boxId=${boxId}`
	);
};

const updateDeliveryStatusDelivered = (customerId, boxId) => {
	return http.put(
		`/deliveries/delivered?customerId=${customerId}&boxId=${boxId}`
	);
};

const removeDelivery = (id) => {
	return http.delete(`/deliveries/${id}`);
};

const deliveryService = {
	getAllDeliveries,
	getDeliverybyId,
	getActiveDeliveriesByCustomerId,
	getPastDeliveriesByCustomerId,
	getDeliveryByTrackingId,
	createDelivery,
	updateDeliveryStatusCollected,
	updateDeliveryStatusDeposited,
	updateDeliveryStatusDelivered,
	removeDelivery,
};

export default deliveryService;
