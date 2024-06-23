import PropTypes from "prop-types";
import ProductForm from "../../components/ProductManage/ProductForm";
import { Tabs } from "antd";
import Upload from "../../components/ProductManage/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
  manageTabKey,
}) => {
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
    editMode
      ? {
          key: "2",
          label: "Product Images",
          children: (
            <Upload
              editProductId={editProductId}
              setActiveTabKey={setActiveTabKey}
            />
          ),
        }
      : null,
  ];

  return (
    <>
      <Tabs defaultActiveKey={manageTabKey} items={items} animated={false} />
    </>
  );
};

ManageProduct.propTypes = {
  setActiveTabKey: PropTypes.func,
  getProducts: PropTypes.func,
  editMode: PropTypes.bool,
  editProductId: PropTypes.any,
  manageTabKey: PropTypes.any,
};

export default ManageProduct;
