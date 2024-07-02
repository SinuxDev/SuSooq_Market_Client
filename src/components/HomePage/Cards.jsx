import PropTypes from "prop-types";
import SImage from "../../images/cardImg.png";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { BookmarkSlashIcon as Bookmark } from "@heroicons/react/24/solid";
import { Card, message } from "antd";
import { Link } from "react-router-dom";
import { saveProduct, unSaveProduct } from "../../api/product";
import { useSelector } from "react-redux";

const Cards = ({
  product,
  saved,
  getSaveProductLists,
  getAllPublicProducts,
  savedProducts,
}) => {
  const { user } = useSelector((state) => state.reducer.user);

  const handleProductSaveStatus = async (id, action) => {
    try {
      const response =
        action === "save" ? await saveProduct(id) : await unSaveProduct(id);

      if (response.isSuccess) {
        if (action === "unsave") {
          getSaveProductLists();
        }
        getAllPublicProducts();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const savedProductHandler = (id) => handleProductSaveStatus(id, "save");

  const UnSavedProductHandler = (id) => handleProductSaveStatus(id, "unsave");

  const isProductSaved = (product) => {
    return savedProducts?.some((p) => p.product_id?._id === product._id);
  };

  return (
    <>
      <div
        className={`${saved ? "basis-1/3" : "basis-1/2"} mx-auto mb-6 px-4 max-300px:basis-9/12 max-300px:max-sm:mx-auto max-700px:max-lg:mx-auto max-700px:max-lg:basis-7/12 max-700px:max-lg:px-14 lg:basis-1/2`}
      >
        <Card
          hoverable
          className="overflow-hidden rounded-lg shadow-lg"
          cover={
            <Link to={`/products/${product._id}`}>
              <img
                src={
                  product.images && product.images[0]
                    ? product.images[0]
                    : SImage
                }
                alt={product.name}
                className="h-56 w-full object-cover"
              />
            </Link>
          }
        >
          <div className="flex items-center justify-between">
            <Link to={`/products/${product._id}`}>
              <p className="my-2 w-fit rounded-lg bg-blue-600 p-2 text-sm text-white max-300px:max-md:text-xs">
                {" "}
                {product.category.toUpperCase().replace("_", " ")}{" "}
              </p>
            </Link>
            <div>
              {user && (
                <>
                  {saved ? (
                    <BookmarkSlashIcon
                      width={20}
                      height={20}
                      className="max- cursor-pointer text-blue-600 max-300px:max-md:h-7 max-300px:max-md:w-5"
                      onClick={(event) => {
                        event.stopPropagation();
                        UnSavedProductHandler(product._id);
                      }}
                    />
                  ) : (
                    <>
                      {isProductSaved(product) ? (
                        <Bookmark
                          width={20}
                          height={20}
                          className="cursor-pointer text-blue-600 max-300px:max-md:h-7 max-300px:max-md:w-5"
                          onClick={() => message.info("Product already saved")}
                        />
                      ) : (
                        <BookmarkIcon
                          width={20}
                          height={20}
                          className="cursor-pointer text-blue-600 max-300px:max-md:h-7 max-300px:max-md:w-5"
                          onClick={(event) => {
                            event.stopPropagation();
                            savedProductHandler(product._id);
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between max-300px:flex-wrap">
            <p className="text-xl font-bold max-300px:max-md:text-base">
              {product.name}
            </p>
            <p className="text-lg font-semibold max-300px:max-md:text-base">
              {" "}
              Price : $ {product.price}{" "}
            </p>
          </div>

          <Link to={`/products/${product._id}`}>
            <p className="italic">{product.description.slice(0, 80)} </p>
          </Link>
        </Card>
      </div>
    </>
  );
};

Cards.propTypes = {
  product: PropTypes.any,
  saved: PropTypes.bool,
  getSaveProductLists: PropTypes.any,
  savedProducts: PropTypes.any,
  getAllPublicProducts: PropTypes.any,
};

export default Cards;
