import http from "../services/http-common";

const HOST = "http://localhost:8081";
const CUSTOMER_AUTHENTICATION_SERVICE_BASE_URL = HOST + "/api/cas";
const USER_BASE_URL = CUSTOMER_AUTHENTICATION_SERVICE_BASE_URL + "/users";

const createUser = ({ email, password, role }) => {
  const userDto = { email, password, role };
  return http.post(USER_BASE_URL, userDto);
};

const getAllUsers = () => {
  return http.get(USER_BASE_URL);
}

const getUserById = (id) => {
  return http.get(USER_BASE_URL + `/${id}`);
};

const getUserRole = (id) => {
  return http.get(USER_BASE_URL + `/${id}/role`);
}

const deleteUser = (id) => {
  return http.delete(USER_BASE_URL + `/${id}`)
}

const userService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserRole,
  deleteUser
};

export default userService;
