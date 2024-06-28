import { axiosInstance } from "./axiosInstance";

// Combined API calls for bids
const fetchBids = async (endPoint, payload = {}, method = "get") => {
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

// get all bids by product ID
export const getAllBids = (product_id) => fetchBids(`/get-bids/${product_id}`);

// add new bids
export const saveNewBid = (payload) => fetchBids("/add-bid", payload, "post");
