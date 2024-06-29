import { axiosInstance } from "./axiosInstance";

// Combined API calls for notifications
const fetchNotifications = async (endPoint, payload = {}, method = "get") => {
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

// Add new notification
export const pushNotification = (payload) =>
  fetchNotifications("/push-notification", payload, "post");

// Get all notifications
export const getNotifications = () => fetchNotifications("/get-notifications");

// Mark notification as read
export const markAsRead = (id) =>
  fetchNotifications(`/mark-as-read/${id}`, {}, "put");
