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

// FetchAdminEntities  [Pagination API]
const fetchAdminentities = async (endpoint, page, perPage) => {
  try {
    const response = await axiosInstance.get(
      `/admin/${endpoint}?page=${page}&perPage=${perPage}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Get All Products API
export const getAllProducts = (page, perPage) =>
  fetchAdminentities("products", page, perPage);

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

// Update User Status API
const updateUserStatus = async (userId, status) => {
  try {
    const response = await axiosInstance.post(
      `/admin/users/${status}/${userId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Ban User API
export const banUser = async (userId) => updateUserStatus(userId, "ban");

// Unban User API
export const unbanUser = async (userId) => updateUserStatus(userId, "unban");
