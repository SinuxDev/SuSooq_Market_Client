import { axiosInstance } from "./axiosInstance";

const adminFetchEntities = async (endpoint) => {
  try {
    const response = await axiosInstance.get(`/admin/${endpoint}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get All Products API
export const getAllProducts = () => adminFetchEntities("products");

// Get All Users API
export const getAllUsers = () => adminFetchEntities("users");

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

// Rollback Product API
export const rollbackProduct = async (productId) =>
  updateProductStatus(productId, "rollback");
