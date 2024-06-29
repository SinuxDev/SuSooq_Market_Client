import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { markAsRead } from "../../api/notification";
import { message } from "antd";

const NotificationsAlert = ({ notifications }) => {
  const [localNotifications, setLocalNotifications] = useState([]);

  // Function to update notification as read
  const updateNoti = async (id) => {
    try {
      const response = await markAsRead(id);
      if (response.isSuccess) {
        message.success(response.message);

        // Update local state to mark notification as read
        setLocalNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === id
              ? { ...notification, isRead: true }
              : notification
          )
        );
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
      <h1 className="text-3xl font-semibold my-2">Notifications</h1>
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
                {!notification.isRead && (
                  <p
                    onClick={() => {
                      updateNoti(notification._id);
                    }}
                    className="text-blue-600 font-medium my-2 underline cursor-pointer"
                  >
                    Mark as read
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
