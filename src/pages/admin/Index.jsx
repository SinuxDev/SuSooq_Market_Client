import { Tabs, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import Products from "./Products";
import User from "./User";
import { getAllProducts, getAllUsers } from "../../api/admin";
import General from "./General";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

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

  const navigate = useNavigate();

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };

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

  const items = [
    {
      key: "1",
      label: "Manage Products",
      children: <Products products={products} getProducts={getProducts} />,
    },
    {
      key: "2",
      label: "Users Management",
      children: <User users={users} getUsers={getUsers} />,
    },
    {
      key: "3",
      label: "Dashboard",
      children: <Dashboard products={products} users={users} />,
    },
    {
      key: "4",
      label: "Notifications",
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
