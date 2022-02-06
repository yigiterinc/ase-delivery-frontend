import http from "../services/http-common";

const HOST = "http://localhost:8081";
const CUSTOMER_AUTHENTICATION_SERVICE_BASE_URL = HOST + "/api/cas";
const USER_BASE_URL = DELIVERY_SERVICE_BASE_URL + "/users";

const createUser = ({ email, password, role }) => {
  const userDto = { email, password, role };
  return http.post(USER_BASE_URL, userDto);
};
