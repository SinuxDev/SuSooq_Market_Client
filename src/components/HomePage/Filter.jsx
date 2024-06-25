import PropTypes from "prop-types";
import { getFilteredProducts } from "../../api/product";

const Filter = ({ products, setProducts }) => {
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const categoryHandler = async (category) => {
    try {
      const response = await getFilteredProducts("category", category);
      if (response.isSuccess) {
        response.products;
        setProducts(response.products);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="font-extrabold text-center text-5xl">Categories</h1>
      <div className="flex items-center gap-3 my-8 max-w-3xl whitespace-nowrap mx-auto flex-wrap justify-center">
        {uniqueCategories.map((category) => (
          <p
            key={category}
            className="text-base font-semibold bg-blue-600 text-white px-2 py-3 rounded-xl cursor-pointer"
            onClick={() => categoryHandler(category)}
          >
            {" "}
            {category.toUpperCase().replace("_", " ")}{" "}
          </p>
        ))}
      </div>
    </>
  );
};

Filter.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func,
};

export default Filter;
