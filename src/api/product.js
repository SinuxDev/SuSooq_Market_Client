import { axiosInstance } from "./axiosInstance";

// Combined API Calls
const FetchProduct = async (endPoint, payload = {}, method = "get") => {
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

// Create Product
export const getSoldProducts = async (payload) =>
  FetchProduct("/create-product", payload, "post");

// Get all products
export const getAllProducts = async () => FetchProduct("/products");

// Get single product
export const getOldProduct = async (id) => FetchProduct(`/product/${id}`);

// Update product
export const updateProducts = async (payload) =>
  FetchProduct("/update-product", payload, "put");

// Delete product
export const deleteProduct = async (id) =>
  FetchProduct(`/delete-product/${id}`, {}, "delete");

// Upload product images
export const uploadProductImages = async (formData) =>
  FetchProduct("/upload-images", formData, "post");

// Get Product Images (Saved Images)
export const getProductImages = async (id) =>
  FetchProduct(`/product-images/${id}`);

// Delete Product Images (Saved Images)
export const deleteProductImages = async (payload) => {
  const { product_id, imgToDelete } = payload;

  try {
    const response = await axiosInstance.delete(
      `/product/images/destroy/${product_id}/${imgToDelete}`,
      {
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Public Products API
export const getPublicProducts = async () => FetchProduct("/api/products");
