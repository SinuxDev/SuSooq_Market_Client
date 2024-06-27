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
      <div className={`${saved ? "basis-1/3" : "basis-1/2"} px-4 mb-6`}>
        <Card
          hoverable
          className="rounded-lg overflow-hidden shadow-lg"
          cover={
            <Link to={`/products/${product._id}`}>
              <img
                src={
                  product.images && product.images[0]
                    ? product.images[0]
                    : SImage
                }
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            </Link>
          }
        >
          <Link to={`/products/${product._id}`}>
            <p className="text-white text-sm bg-blue-600 rounded-lg p-2 w-fit my-2">
              {" "}
              {product.category.toUpperCase().replace("_", " ")}{" "}
            </p>
          </Link>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">{product.name}</p>
            <p className="text-lg font-semibold"> Price : $ {product.price} </p>

            {user && (
              <>
                {saved ? (
                  <BookmarkSlashIcon
                    width={20}
                    height={20}
                    className="text-blue-600 cursor-pointer"
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
                        className="text-blue-600 cursor-pointer"
                        onClick={() => message.info("Product already saved")}
                      />
                    ) : (
                      <BookmarkIcon
                        width={20}
                        height={20}
                        className="text-blue-600 cursor-pointer"
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
