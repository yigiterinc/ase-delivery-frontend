import http from "../services/http-common";
import axios from "axios";

const HOST = "http://localhost:10789";
const CUSTOMER_AUTHENTICATION_SERVICE_BASE_URL = HOST + "/api/cas";
const USER_BASE_URL = CUSTOMER_AUTHENTICATION_SERVICE_BASE_URL + "/users";
const LOGIN_URL = CUSTOMER_AUTHENTICATION_SERVICE_BASE_URL + "/login"
const FETCH_ROLE_URL = USER_BASE_URL + "/role";

const createUser = ({ email, password, role }) => {
  const userDto = { email, password, role };
  return http.post(USER_BASE_URL, userDto);
};

const getAllUsers = () => {
  return http.get(USER_BASE_URL + "/all");
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

export const login = ({email, password}) => {
  let loginDto = {
    email,
    password
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(LOGIN_URL, loginDto);

      resolve(res.data);

      console.log(res)

      if (res.data.status === "success") {
        return res.data;
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchRoleByToken = async (token) => {
  const res = await axios.get(FETCH_ROLE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const jwToken = localStorage.getItem("jwToken");

      if (!jwToken) {
        reject("Token Not Found!");
      }

      const res = await axios.get(USER_BASE_URL, {
        headers: {
          Authorization: jwToken,
        },
      });

      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });
};

export default userService;
