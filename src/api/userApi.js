import axios from "axios";

const rootUrl = "http://localhost:10789/api/cas";
const loginUrl = rootUrl + "/login";
const userProfileUrl = rootUrl + "/users";
const logoutUrl = rootUrl + "user/logout";
const newJWToken = rootUrl + "tokens";

export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, frmData);

      resolve(res.data);

      if (res.data.status === "success") {
        localStorage.setItem("jwToken", res.data.jwToken);
        localStorage.setItem(
          "aseDelivery",
          JSON.stringify({ refreshToken: res.data.refreshToken })
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const jwToken = localStorage.getItem("jwToken");

      if (!jwToken) {
        reject("Token Not Found!");
      }

      const res = await axios.get(userProfileUrl, {
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

export const fetchJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshToken } = JSON.parse(localStorage.getItem("aseDelivery"));

      if (!refreshToken) {
        reject("Token Not Found!");
      }

      const res = await axios.get(newJWToken, {
        headers: {
          Authorization: refreshToken,
        },
      });

      if (res.data.status === "success") {
        localStorage.setItem("jwToken", res.data.jwToken);
      }

      resolve(true);
    } catch (error) {
      if (error.message === "403 Error - Request Failed!") {
        localStorage.removeItem("aseDelivery");
      }

      reject(false);
    }
  });
};

export const logout = async () => {
  try {
    localStorage.removeItem("jwToken");
    localStorage.removeItem("ROLE")
  } catch (error) {
    console.log(error);
  }
};
