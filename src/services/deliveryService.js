import http from "../services/http-common";

const HOST = "http://localhost:8080"
const DELIVERY_SERVICE_BASE_URL = HOST + "/api/ds"
const DELIVERIES_BASE_URL = DELIVERY_SERVICE_BASE_URL + "/deliveries"

const getAllDeliveries = () => {
	return http.get(DELIVERIES_BASE_URL);
};

const getDeliveryById = (id) => {
	return http.get(DELIVERIES_BASE_URL + `/${id}`);
};

const getActiveDeliveriesOfCustomer = (customerId) => {
	return http.get(DELIVERIES_BASE_URL + `/customer/${customerId}/status/active`);
};

const getPastDeliveriesOfCustomer = (customerId) => {
	return http.get(DELIVERIES_BASE_URL + `/customer/${customerId}/status/delivered`);
};

const createDelivery = (data) => {
	return http.post(DELIVERIES_BASE_URL, data);
};

const onDeliveriesCollected = (ids, delivererId) => {
	return http.put(
		DELIVERIES_BASE_URL + `/${ids.join(",")}/collected/deliverer/${delivererId}`
	);
};

const onDeliveryDeposited = (deliveryId, delivererId, boxId) => {
	return http.put(
		DELIVERIES_BASE_URL + `/${deliveryId}/deposited/deliverer/${delivererId}/box/${boxId}`
	);
};

const onDeliveryDelivered = (userId, boxId) => {
	return http.put(DELIVERIES_BASE_URL + `/user/${userId}/delivered/box/${boxId}`);
};

const deleteDelivery = (id) => {
	return http.delete(`/${id}`);
};

const deliveryService = {
	getAllDeliveries,
	getDeliveryById,
	getActiveDeliveriesOfCustomer,
	getPastDeliveriesOfCustomer,
	createDelivery,
	onDeliveriesCollected,
	onDeliveryDeposited,
	onDeliveryDelivered,
	deleteDelivery,
};

export default deliveryService;
