import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

const NotificationsAlert = ({ notifications }) => {
  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">Notifications</h1>
      <div className="max-w-3xl">
        {notifications.map((notification) => (
          <div key={notification._id} className="my-2 bg-white rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">
              {" "}
              {moment(notification.createdAt).format("L")}{" "}
            </p>
            <h2 className="text-xl font-medium my-2">{notification.title}</h2>
            <p className="text-sm font-medium text-gray-600">
              {notification.message}
            </p>
            <p className="font-medium text-gray-600 mt-2 ">
              {" "}
              Contact -{" "}
              <span className="tracking-wide">
                {notification.phone_number}
              </span>{" "}
            </p>
            <hr className="border text-gray-300 my-2" />
            <div className="flex justify-end">
              <Link
                to={`/products/${notification.product_id}`}
                className="text-blue-600 font-medium my-2 underline cursor-pointer"
              >
                {" "}
                View bids{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

NotificationsAlert.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default NotificationsAlert;
