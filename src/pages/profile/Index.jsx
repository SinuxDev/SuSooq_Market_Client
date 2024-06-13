import { Tabs } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";
import General from "./General";

import { useState } from "react";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Add Product",
      children: <AddProduct setActiveTabKey={setActiveTabKey} />,
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
