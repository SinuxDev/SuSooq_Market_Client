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

const updateProductStatus = async (productId, status) => {
  try {
    const response = await axiosInstance.post(
      `/admin/products/${status}/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Approve Product API
export const approveProduct = async (productId) =>
  updateProductStatus(productId, "approve");

// Reject Product API
export const rejectProduct = async (productId) =>
  updateProductStatus(productId, "reject");
