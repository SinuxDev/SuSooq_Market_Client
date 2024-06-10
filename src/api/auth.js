import { axiosInstance } from "./axiosInstance";

// register new account
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload, {
      validateStatus: () => true,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// login to account
export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload, {
      validateStatus: () => true,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// check if user token is valid
export const checkUserToken = async () => {
  try {
    const response = await axiosInstance.get("/checkUserToken", {
      validateStatus: () => true,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};
