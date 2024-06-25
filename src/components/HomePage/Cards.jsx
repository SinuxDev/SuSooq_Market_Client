import PropTypes from "prop-types";
import SImage from "../../images/cardImg.png";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Card } from "antd";

const Cards = ({ product }) => {
  return (
    <>
      <div className="basis-1/2 px-4 mb-6">
        <Card
          hoverable
          className="rounded-lg overflow-hidden shadow-lg"
          cover={
            <img
              src={product.images[0] ? product.images[0] : SImage}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
          }
        >
          <p className="text-white text-sm bg-blue-600 rounded-lg p-2 w-fit my-2">
            {" "}
            {product.category.toUpperCase().replace("_", " ")}{" "}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">{product.name}</p>
            <p className="text-lg font-semibold"> Price : $ {product.price} </p>
            <BookmarkIcon
              width={20}
              height={20}
              className="text-blue-600 cursor-pointer"
            />
          </div>
          <p className="italic">{product.description.slice(0, 80)} </p>
        </Card>
      </div>
    </>
  );
};

Cards.propTypes = {
  product: PropTypes.any,
};

export default Cards;
