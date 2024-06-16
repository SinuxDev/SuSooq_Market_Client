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

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products", {
      validateStatus: () => true,
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Get single product
export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`, {
      validateStatus: () => true,
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Update product
export const updateProducts = async (payload) => {
  try {
    const response = await axiosInstance.put("/update-product", payload, {
      validateStatus: () => true,
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/delete-product/${id}`, {
      validateStatus: () => true,
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Upload product images
export const uploadProductImages = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload-images", formData, {
      validateStatus: () => true,
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
};
