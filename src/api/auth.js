import { axiosInstance } from "./axiosInstance";

// Combined API Calls [Auth]
const FetchAuth = async (endPoint, payload = {}, method = "get") => {
  try {
    const response = await axiosInstance({
      method,
      url: endPoint,
      data: payload,
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// register new account
export const registerUser = async (payload) =>
  FetchAuth("/register", payload, "post");

// login to account
export const loginUser = async (payload) =>
  FetchAuth("/login", payload, "post");

// check if user token is valid
export const checkUserToken = async () => FetchAuth("/checkUserToken");
