import { axiosInstance } from "./axiosInstance";

// Sold Products
export const getSoldProducts = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload, {
      validateStatus: () => true,
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
};
