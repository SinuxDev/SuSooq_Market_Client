import Hero from "../../components/HomePage/Hero";
import Filter from "../../components/HomePage/Filter";
import Cards from "../../components/HomePage/Cards";
import { useCallback, useEffect, useState } from "react";
import { getPublicProducts, getSavedProducts } from "../../api/product";
import { message } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { setProcessing } from "../../store/slices/loaderSlice";
import { RotatingLines } from "react-loader-spinner";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.reducer.isProcessing);

  const fetchProducts = useCallback(
    async (fetchFunction, setData) => {
      dispatch(setProcessing(true));
      try {
        const response = await fetchFunction();
        if (response.isSuccess) {
          if (setData == setProducts) {
            setData(response.products);
          } else {
            setData(response.savedProducts);
          }
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      } finally {
        dispatch(setProcessing(false));
      }
    },
    [dispatch]
  );

  const getAllPublicProducts = useCallback(
    () => fetchProducts(getPublicProducts, setProducts),
    [fetchProducts]
  );

  const getSaveProducts = useCallback(
    () => fetchProducts(getSavedProducts, setSavedProducts),
    [fetchProducts]
  );

  useEffect(() => {
    getAllPublicProducts();
    getSaveProducts();
  }, [getAllPublicProducts, getSaveProducts]);

  return (
    <>
      <Hero
        setProducts={setProducts}
        getAllPublicProducts={getAllPublicProducts}
      />
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
        <>
          <Filter products={products} setProducts={setProducts} />
          <div className="flex max-w-4xl flex-wrap mx-auto flex-row">
            {products.map((product) => (
              <Cards
                key={product._id}
                product={product}
                savedProducts={savedProducts}
                getAllPublicProducts={getAllPublicProducts}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Index;
