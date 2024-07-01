import { Suspense, lazy } from "react";

const Hero = lazy(() => import("../../components/HomePage/Hero"));
const Filter = lazy(() => import("../../components/HomePage/Filter"));
const Cards = lazy(() => import("../../components/HomePage/Cards"));
import { useCallback, useEffect, useState } from "react";
import { getPublicProducts, getSavedProducts } from "../../api/product";

import { useSelector, useDispatch } from "react-redux";
import { setProcessing } from "../../store/slices/loaderSlice";
import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "antd";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.reducer.isProcessing);

  const fetchProducts = useCallback(
    async (fetchFunction, setData, page = 1, perPage = 6) => {
      dispatch(setProcessing(true));
      try {
        const response = await fetchFunction(page, perPage);
        if (response.isSuccess) {
          if (setData === setProducts) {
            setData(response.products);
            setCurrentPage(response.currentPage);
            setTotalPages(response.totalPages);
          } else {
            setData(response.savedProducts);
          }
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch(setProcessing(false));
      }
    },
    [dispatch],
  );

  const getAllPublicProducts = useCallback(
    () => fetchProducts(getPublicProducts, setProducts, page, perPage),
    [fetchProducts, page, perPage],
  );

  const getSaveProducts = useCallback(
    () => fetchProducts(getSavedProducts, setSavedProducts),
    [fetchProducts],
  );

  const handlePagination = (page, pageSize) => {
    setPage(page);
    setPerPage(pageSize);
  };

  useEffect(() => {
    getAllPublicProducts();
  }, [getAllPublicProducts]);

  useEffect(() => {
    getSaveProducts();
  }, [getSaveProducts]);

  useEffect(() => {
    fetchProducts(getPublicProducts, setProducts, page, perPage);
  }, [fetchProducts, page, perPage]);

  return (
    <>
      <Suspense>
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
            <div className="mx-auto flex max-w-4xl flex-row flex-wrap">
              {products.map((product) => (
                <Cards
                  key={product._id}
                  product={product}
                  savedProducts={savedProducts}
                  getAllPublicProducts={getAllPublicProducts}
                />
              ))}
            </div>
            <div className="mx-auto mb-20 mt-5 flex max-w-4xl justify-end">
              <Pagination
                current={currentPage}
                total={totalPages * perPage}
                pageSize={perPage}
                onChange={handlePagination}
              />
            </div>
          </>
        )}
      </Suspense>
    </>
  );
};

export default Index;
