import { axiosInstance } from "./axiosInstance";

// Get All Products API
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/admin/products", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Approve Product API
export const approveProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/products/approve/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Reject Product API
export const rejectProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/products/reject/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
