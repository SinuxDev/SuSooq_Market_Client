import PropTypes from "prop-types";

const Filter = ({ products }) => {
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <>
      <h1 className="font-extrabold text-center text-5xl">Categories</h1>
      <div className="flex items-center gap-3 my-8 max-w-3xl whitespace-nowrap mx-auto flex-wrap justify-center">
        {uniqueCategories.map((category) => (
          <p
            key={category}
            className="text-base font-semibold bg-blue-600 text-white px-2 py-2 rounded-xl"
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
};

export default Filter;
