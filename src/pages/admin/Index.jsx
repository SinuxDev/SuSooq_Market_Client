import { Tabs, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import Products from "./Products";
import User from "./User";
import { getAllProducts, getAllUsers } from "../../api/admin";
import General from "./General";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { getNotifications } from "../../api/notification";
import NotificationsAlert from "./NotificationsAlert";
import { BellAlertIcon } from "@heroicons/react/24/solid";

const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const [notifications, setNotifications] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  const getUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.userDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }, []);

  const getNoti = useCallback(async () => {
    try {
      const response = await getNotifications();

      if (response.isSuccess) {
        // Check if notifications have actually changed before updating state
        if (
          JSON.stringify(notifications) !==
          JSON.stringify(response.notifications)
        ) {
          setNotifications(response.notifications);
          message.success(response.message);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }, [notifications]);

  const navigate = useNavigate();

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  const getProducts = useCallback(async (page = 1, perPage = 10) => {
    try {
      const response = await getAllProducts(page, perPage);
      if (response.isSuccess) {
        setProducts(response.products);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setTotalProducts(response.totalProducts);
        setTotalPrice(response.totalPrice);
        setTotalPending(response.pendingProducts);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }, []);

  const checkIsAdmin = useCallback(() => {
    if (user.role !== "admin") {
      message.error("You are not authorized to access this page");
      navigate("/");
      return;
    }
  }, [user.role, navigate]);

  useEffect(() => {
    getProducts();
    getUsers();
  }, [activeTabKey, checkIsAdmin, getProducts, getUsers]);

  useEffect(() => {
    getNoti();
  }, [getNoti]);

  const items = [
    {
      key: "1",
      label: "Manage Products",
      children: (
        <Products
          products={products}
          getProducts={getProducts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ),
    },
    {
      key: "2",
      label: "Users Management",
      children: <User users={users} getUsers={getUsers} />,
    },
    {
      key: "3",
      label: "Dashboard",
      children: (
        <Dashboard
          products={products}
          users={users}
          totalProducts={totalProducts}
          totalPrice={totalPrice}
          totalPending={totalPending}
          setActiveTabKey={setActiveTabKey}
        />
      ),
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
          <span className="text-red-600 italic">
            {" "}
            {notifications && notifications.length > 0
              ? notifications.length
              : "0"}{" "}
          </span>
        </span>
      ),
      children: <NotificationsAlert notifications={notifications} />,
    },
    {
      key: "5",
      label: "General",
      children: <General />,
    },
  ];

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        tabPosition="left"
        size="large"
        items={items}
        animated={false}
      />
    </section>
  );
};

export default Index;
