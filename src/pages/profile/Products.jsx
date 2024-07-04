import PropTypes from "prop-types";
import moment from "moment";
import { deleteProduct } from "../../api/product";
import { message } from "antd";

const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getProducts,
  setManageTabKey,
}) => {
  const editButtonHandler = (productId) => {
    setEditProductId(productId);
    setEditMode(true);
    setActiveTabKey("2");
  };

  const uploadButtonHandler = (productId) => {
    setEditProductId(productId);
    setEditMode(true);
    setActiveTabKey("2");
    setManageTabKey("2");
  };

  const deleteButtonHandler = async (product_id) => {
    try {
      const response = await deleteProduct(product_id);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <h1 className="my-2 text-center text-3xl font-semibold">Products List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
          <thead className="bg-gray-50 text-center text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr
                    className="border-b odd:bg-white even:bg-gray-50"
                    key={product._id}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-900"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4"> {product.category} </td>
                    <td className="px-6 py-4">
                      {" "}
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {product.status === "pending" && (
                        <span className="rounded-md bg-yellow-400 p-1 text-xs text-white">
                          {product.status}
                        </span>
                      )}
                      {product.status === "approved" && (
                        <span className="rounded-md bg-green-600 p-1 text-xs text-white">
                          {" "}
                          {product.status}{" "}
                        </span>
                      )}
                      {product.status === "rejected" && (
                        <span className="rounded-md bg-red-600 p-1 text-xs text-white">
                          {" "}
                          {product.status}{" "}
                        </span>
                      )}{" "}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="me-4 font-medium text-green-600 hover:underline"
                        onClick={() => {
                          uploadButtonHandler(product._id);
                        }}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className="me-4 font-medium text-blue-600 hover:underline"
                        onClick={() => {
                          editButtonHandler(product._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="font-medium text-red-500 hover:underline"
                        onClick={() => {
                          deleteButtonHandler(product._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Products.propTypes = {
  products: PropTypes.any,
  setActiveTabKey: PropTypes.func,
  setEditMode: PropTypes.func,
  setEditProductId: PropTypes.any,
  getProducts: PropTypes.any,
  setManageTabKey: PropTypes.any,
};

export default Products;
