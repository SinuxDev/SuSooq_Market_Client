import { Tabs, message } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";
import General from "./General";
import { getAllProducts } from "../../api/product";
import { useState, useEffect } from "react";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
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
  };

  useEffect(() => {
    getProducts();
  }, []);

  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products products={products} setActiveTabKey={setActiveTabKey} />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <AddProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
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

  return (
    <>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => setActiveTabKey(key)}
        items={items}
        tabPosition="left"
        animated={false}
      />
    </>
  );
};

export default Index;
