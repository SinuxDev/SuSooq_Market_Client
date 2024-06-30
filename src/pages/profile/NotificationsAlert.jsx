import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../../api/notification";
import { message } from "antd";

const NotificationsAlert = ({ notifications }) => {
  const [localNotifications, setLocalNotifications] = useState([]);

  // Function to update notification as read and delete
  const updateNoti = async (id = null, status = "") => {
    try {
      const response = await (status === "mark-as-read"
        ? markAsRead(id)
        : status === "delete-all-notifications"
          ? deleteAllNotifications()
          : deleteNotification(id));
      if (response.isSuccess) {
        message.success(response.message);

        if (status === "mark-as-read") {
          setLocalNotifications((prev) =>
            prev.map((notification) =>
              notification._id === id
                ? { ...notification, isRead: true }
                : notification
            )
          );
        } else if (status === "delete-all-notifications") {
          setLocalNotifications([]);
        } else {
          setLocalNotifications((prev) =>
            prev.filter((notification) => notification._id !== id)
          );
        }
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (notifications) {
      setLocalNotifications(notifications);
    }
  }, [notifications]);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold my-2">Notifications</h1>
        {localNotifications.length > 0 && (
          <button
            className="bg-blue-600 text-white p-2 rounded-lg"
            onClick={() => updateNoti("", "delete-all-notifications")}
          >
            {" "}
            Delete All Notifications{" "}
          </button>
        )}
      </div>
      <div className="max-w-3xl">
        {localNotifications &&
          localNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`my-2 ${notification.isRead ? "bg-gray-400" : "bg-white"} rounded-lg p-4`}
            >
              <p className="text-sm font-medium text-gray-500">
                {moment(notification.createdAt).format("L")}
              </p>
              <h2 className="text-xl font-medium my-2">{notification.title}</h2>
              <p className="text-sm font-medium text-gray-600">
                {notification.message}
              </p>
              <p className="font-medium text-gray-600 mt-2">
                Contact -{" "}
                <span className="tracking-wide">
                  {notification.phone_number}
                </span>
              </p>
              <hr className="border text-gray-300 my-2" />
              <div className="flex justify-end gap-3">
                <Link
                  to={`/products/${notification.product_id}`}
                  className="text-blue-600 font-medium my-2 underline cursor-pointer"
                >
                  View bids
                </Link>
                {!notification.isRead ? (
                  <p
                    onClick={() => {
                      updateNoti(notification._id, "mark-as-read");
                    }}
                    className="text-blue-600 font-medium my-2 underline cursor-pointer"
                  >
                    Mark as read
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      updateNoti(notification._id, "delete-notification");
                    }}
                    className="text-blue-600 font-medium my-2 underline cursor-pointer"
                  >
                    Delete
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

NotificationsAlert.propTypes = {
  notifications: PropTypes.array,
};

export default NotificationsAlert;
