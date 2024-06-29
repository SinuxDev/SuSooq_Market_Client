import { Tabs, message } from "antd";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import General from "./General";
import { getAllProducts } from "../../api/product";
import { useState, useEffect, useCallback } from "react";
import { getNotifications } from "../../api/notification";
import NotificationsAlert from "./NotificationsAlert";
import { BellAlertIcon } from "@heroicons/react/24/solid";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [manageTabKey, setManageTabKey] = useState("1");
  const [unreadNoti, setUnreadNoti] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();

      if (response.isSuccess) {
        setProducts(response.products);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }, [setProducts]);

  const getNoti = useCallback(async () => {
    try {
      const response = await getNotifications();

      if (response.isSuccess) {
        // Filter out unread notifications
        const ResunreadNotifications = response.notifications.filter(
          (notification) => !notification.isRead
        );
        setUnreadNoti(ResunreadNotifications);
        setNotifications(response.notifications);
        if (ResunreadNotifications.length > 0) {
          message.info("You have unread notifications");
        }
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }, []);

  useEffect(() => {
    if (activeTabKey === "1") {
      setEditMode(false);
      setEditProductId(null);
    }
    getProducts();
  }, [getProducts, activeTabKey]);

  useEffect(() => {
    getNoti();
  }, [getNoti]);

  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
          setManageTabKey={setManageTabKey}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
          manageTabKey={manageTabKey}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
          <span className="text-red-600 italic">
            {" "}
            {unreadNoti && unreadNoti.length > 0 ? unreadNoti.length : "0"}{" "}
          </span>
        </span>
      ),
      children: <NotificationsAlert notifications={notifications} />,
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
        animated={false}
      />
    </>
  );
};

export default Index;
