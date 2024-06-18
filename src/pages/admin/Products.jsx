import PropTypes from "prop-types";
import moment from "moment";

const Products = ({ products }) => {
  return (
    <section>
      <h1 className="text-3xl font-semibold my-2 text-center">Products List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Seller
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
                    className="odd:bg-white  even:bg-gray-50  border-b "
                    key={product._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left "
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4"> {product.category} </td>
                    <td className="px-6 py-4"> {product.seller.name} </td>
                    <td className="px-6 py-4">
                      {" "}
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {product.status === "pending" ? (
                        <span className="bg-yellow-400 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      ) : (
                        <span className="bg-green-600 text-xs p-1 rounded-md text-white">
                          {" "}
                          {product.status}{" "}
                        </span>
                      )}{" "}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
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
  products: PropTypes.array.isRequired,
};

export default Products;