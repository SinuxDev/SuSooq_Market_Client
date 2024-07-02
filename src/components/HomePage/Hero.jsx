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
import { message } from "antd";

const Hero = ({ setProducts, getAllPublicProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const searchQueryHandler = async () => {
    if (searchQuery.trim().length === 0) {
      return message.error("Please enter a value", 3);
    }
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
      <div className="my-8 w-full text-center">
        <h1 className="mb-5 text-3xl font-bold text-blue-600 max-300px:max-sm:text-2xl">
          <q>Rich With SuSooq</q>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg font-medium text-gray-600 max-300px:max-sm:mx-10 max-300px:max-sm:text-base">
          Explore a wide range of products. Secure transactions. Connect with a
          vibrant community. Enjoy exclusive deals and a seamless shopping
          experience. Join us today!
        </p>
        <div className="mx-auto mb-10 mt-16 flex max-w-6xl items-center justify-between min-300px:max-sm:mx-auto min-300px:max-sm:flex-wrap max-700px:max-xl:mx-5 max-700px:max-xl:flex-wrap">
          <div className="mb-10 flex w-1/3 flex-col items-center min-300px:max-sm:w-full max-700px:max-xl:w-1/2">
            <div className="mx-auto mb-2 w-1/6 rounded-xl bg-blue-500 p-1 max-300px:max-sm:p-2 max-700px:max-xl:w-14">
              <CloudArrowUpIcon
                width={40}
                height={40}
                className="mx-auto text-gray-300 max-700px:max-xl:h-9 max-700px:max-xl:w-8"
              />
            </div>
            <p className="text-2xl font-extrabold text-black max-300px:max-sm:text-base max-700px:max-xl:text-xl">
              Cloud Storage
            </p>
            <p className="flex-grow font-semibold italic text-gray-500 max-300px:max-sm:text-sm max-700px:max-xl:text-base">
              Secure and Scalable & <br /> Smarter with Cloud Storage Solutions
            </p>
          </div>
          <div className="mb-10 flex w-1/2 flex-col items-center min-300px:max-sm:w-full">
            <div className="mx-auto mb-2 w-1/6 rounded-xl bg-blue-500 px-2 py-1 max-300px:max-sm:px-1 max-700px:max-xl:w-14">
              <LockClosedIcon
                width={40}
                height={40}
                className="mx-auto text-gray-300 max-700px:max-xl:h-9 max-700px:max-xl:w-8"
              />
            </div>
            <p className="text-2xl font-extrabold text-black max-300px:max-sm:text-base max-700px:max-xl:text-xl">
              Data Security
            </p>
            <p className="flex-grow text-xl font-semibold italic text-gray-500 max-300px:max-sm:text-sm max-700px:max-xl:text-base">
              Your Data, Our Priority <br /> Top-Tier Security Solutions
            </p>
          </div>
          <div className="flex w-1/3 flex-col items-center min-300px:max-sm:w-full max-700px:max-xl:mt-12 max-700px:max-xl:w-full">
            <div className="mx-auto mb-2 w-1/6 rounded-xl bg-blue-500 p-1 max-300px:max-sm:p-2 max-700px:max-xl:w-14">
              <GlobeAltIcon
                width={40}
                height={40}
                className="mx-auto text-gray-300 max-700px:max-xl:h-9 max-700px:max-xl:w-8"
              />
            </div>
            <p className="text-2xl font-extrabold text-black max-300px:max-sm:text-base max-700px:max-xl:text-xl">
              Global Shipping
            </p>
            <p className="flex-grow text-xl font-semibold italic text-gray-500 max-300px:max-sm:text-sm max-700px:max-xl:text-base">
              Seamless Worldwide Delivery Solutions
            </p>
          </div>
        </div>
        <hr className="mb-12 border border-gray-300" />
        <div className="mx-auto flex max-w-sm items-center gap-2 max-300px:max-sm:mx-auto max-300px:max-sm:max-w-xs">
          <div className="relative w-full max-300px:max-sm:w-3/4">
            <input
              type="text"
              className="w-full rounded-xl bg-gray-200 p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon
              width={20}
              height={20}
              className="absolute right-2 top-2 cursor-pointer text-blue-600"
              onClick={searchQueryHandler}
            />
          </div>
          <button
            type="button"
            className="rounded-md bg-blue-600 p-2 text-sm font-medium text-white"
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
