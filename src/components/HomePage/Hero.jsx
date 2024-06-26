import PropTypes from "prop-types";
import {
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  GlobeAltIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { getFilteredProducts } from "../../api/product";

import { useDispatch } from "react-redux";
import { setProcessing } from "../../store/slices/loaderSlice";

const Hero = ({ setProducts, getAllPublicProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const searchQueryHandler = async () => {
    dispatch(setProcessing(true));
    try {
      const response = await getFilteredProducts("searchQuery", searchQuery);
      if (response.isSuccess) {
        setProducts(response.products);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
    dispatch(setProcessing(false));
  };

  const ClearHandler = () => {
    setSearchQuery("");
    getAllPublicProducts();
  };

  return (
    <>
      <div className="w-full text-center my-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-5">
          <q>Rich With SuSooq</q>
        </h1>
        <p className="text-lg font-medium text-gray-600 max-w-xl mx-auto mb-8">
          Explore a wide range of products. Secure transactions. Connect with a
          vibrant community. Enjoy exclusive deals and a seamless shopping
          experience. Join us today!
        </p>
        <div className="flex items-center justify-between max-w-6xl mx-auto mt-16 mb-10">
          <div className="flex items-center flex-col w-1/3">
            <div className="bg-blue-500 p-1 w-1/6 mx-auto rounded-xl mb-2">
              <CloudArrowUpIcon
                width={40}
                height={40}
                className="text-gray-300 mx-auto"
              />
            </div>
            <p className="text-black font-extrabold text-2xl">Cloud Storage</p>
            <p className="text-gray-500 font-semibold italic flex-grow">
              Secure and Scalable & Smarter with Cloud Storage Solutions
            </p>
          </div>
          <div className="flex items-center flex-col w-1/2">
            <div className="bg-blue-500 p-1 w-1/6 mx-auto rounded-xl mb-2">
              <LockClosedIcon
                width={40}
                height={40}
                className="text-gray-300 mx-auto"
              />
            </div>
            <p className="text-black font-extrabold text-2xl">Data Security</p>
            <p className="text-gray-500 font-semibold italic flex-grow">
              Your Data, Our Priority: Top-Tier Security Solutions
            </p>
          </div>
          <div className="flex items-center flex-col w-1/3">
            <div className="bg-blue-500 p-1 w-1/6 mx-auto rounded-xl mb-2">
              <GlobeAltIcon
                width={40}
                height={40}
                className="text-gray-300 mx-auto"
              />
            </div>
            <p className="text-black font-extrabold text-2xl">
              Global Shipping
            </p>
            <p className="text-gray-500 font-semibold italic flex-grow">
              Seamless Worldwide Delivery Solutions
            </p>
          </div>
        </div>
        <hr className="border border-gray-300 mb-12" />
        <div className="max-w-sm mx-auto  flex items-center gap-2 ">
          <div className="relative w-full">
            <input
              type="text"
              className="bg-gray-200 p-2 rounded-xl w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon
              width={20}
              height={20}
              className="text-blue-600 absolute top-2 right-2 cursor-pointer"
              onClick={searchQueryHandler}
            />
          </div>
          <button
            type="button"
            className="text-sm font-medium text-white bg-blue-600 p-2 rounded-md "
            onClick={() => ClearHandler()}
          >
            {" "}
            Clear{" "}
          </button>
        </div>
      </div>
    </>
  );
};

Hero.propTypes = {
  setProducts: PropTypes.func,
  getAllPublicProducts: PropTypes.func,
};

export default Hero;
