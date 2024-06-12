import { Tabs } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";
import General from "./General";

const Index = () => {
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Add Product",
      children: <AddProduct />,
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
      <Tabs defaultActiveKey="1" items={items} tabPosition="left" />
    </>
  );
};

export default Index;
