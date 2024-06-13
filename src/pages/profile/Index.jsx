import { Tabs, message } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";
import General from "./General";
import { getAllProducts } from "../../api/product";
import { useState, useEffect, useCallback } from "react";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

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

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <AddProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    {
      key: "3",
      label: "Notifications",
      children: "Notifications Content",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
    setEditMode(false);
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
