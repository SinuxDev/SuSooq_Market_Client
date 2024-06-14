import PropTypes from "prop-types";
import ProductForm from "../../components/ProductForm";
import { Tabs } from "antd";
import { useState } from "react";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [productActiveTabKey, setProductActiveTabKey] = useState("1");

  const items = [
    {
      key: "1",
      label: "Products Details",
      children: (
        <ProductForm
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    {
      key: "2",
      label: "Product Images",
      children: <h1>hello </h1>,
    },
  ];

  const onChangeHandler = (key) => {
    setProductActiveTabKey(key);
  };

  return (
    <>
      <Tabs
        activeKey={productActiveTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        animated={false}
      />
    </>
  );
};

ManageProduct.propTypes = {
  setActiveTabKey: PropTypes.func,
  getProducts: PropTypes.func,
  editMode: PropTypes.bool,
  editProductId: PropTypes.any,
};

export default ManageProduct;
