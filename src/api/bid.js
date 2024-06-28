import { axiosInstance } from "./axiosInstance";

// add new bids
export const saveNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post("/add-bid", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};
