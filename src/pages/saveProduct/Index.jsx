import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { getSavedProducts } from "../../api/product";
import Cards from "../../components/HomePage/Cards";
import { useSelector, useDispatch } from "react-redux";
import { setProcessing } from "../../store/slices/loaderSlice";
import { RotatingLines } from "react-loader-spinner";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.reducer.isProcessing);
  const navigate = useNavigate();

  const getSaveProductLists = useCallback(async () => {
    dispatch(setProcessing(true));
    try {
      const response = await getSavedProducts();
      if (response.isSuccess) {
        message.success(response.message);
        setSavedProducts(response.savedProducts);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setProcessing(false));
  }, [dispatch]);

  useEffect(() => {
    getSaveProductLists();
  }, [getSaveProductLists]);

  return (
    <section>
      <div className="flex items-center justify-evenly">
        <h1 className="text-2xl font-bold my-4 text-center">
          Saved Product Lists
        </h1>
        <span className="bg-blue-600 text-white p-2 rounded-lg cursor-pointer">
          <ArrowLeftIcon width={30} height={20} onClick={() => navigate(-1)} />
        </span>
      </div>
      {isProcessing ? (
        <div className="flex items-center justify-center">
          <RotatingLines
            visible={isProcessing}
            height="96"
            width="96"
            color="blue"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap">
          {savedProducts && savedProducts.length > 0 && (
            <>
              {savedProducts.map((product) => (
                <Cards
                  key={product.product_id._id}
                  product={product.product_id}
                  saved={true}
                  getSaveProductLists={getSaveProductLists}
                />
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Index;
