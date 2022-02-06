import http from "../services/http-common";

const HOST = "http://localhost:8080"
const DELIVERY_SERVICE_BASE_URL = HOST + "/api/ds"
const DELIVERIES_BASE_URL = DELIVERY_SERVICE_BASE_URL + "/deliveries"
const CHANGE_DELIVERY_STATUS_COLLECTED_URL = (deliveryIds, delivererId) => `${deliveryIds.join(",")}/collected/deliverer/${delivererId}`

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
	return http.post(DELIVERIES_BASE_URL, data);
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
