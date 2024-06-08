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
