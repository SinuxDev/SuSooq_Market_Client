import PropTypes from "prop-types";

const Filter = ({ products }) => {
  return (
    <>
      <h1 className="font-extrabold text-center text-5xl">Categories</h1>
      <div className="flex items-center gap-3 my-8 max-w-3xl whitespace-nowrap mx-auto flex-wrap justify-center">
        {products.map((product) => (
          <p
            key={product._id}
            className="text-base font-semibold bg-blue-600 text-white px-2 py-2 rounded-xl"
          >
            {" "}
            {product.category.toUpperCase().replace("_", " ")}{" "}
          </p>
        ))}
      </div>
    </>
  );
};

Filter.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Filter;
