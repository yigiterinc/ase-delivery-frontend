import axios from "axios";

const rootUrl = "https://reqres.in/api/login";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newJWToken = rootUrl + "tokens";


export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, frmData);

      resolve(res.data);

      if (res.data.status === "success") {
        sessionStorage.setItem("jwToken", res.data.jwToken);
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
      const jwToken = sessionStorage.getItem("jwToken");

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
        sessionStorage.setItem("jwToken", res.data.jwToken);
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

export const userLogout = async () => {
  try {
    await axios.delete(logoutUrl, {
      headers: {
        Authorization: sessionStorage.getItem("jwToken"),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
