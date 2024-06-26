import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { getSavedProducts } from "../../api/product";
import Cards from "../../components/HomePage/Cards";

const Index = () => {
  const [savedProducts, setSavedProducts] = useState([]);

  const getSaveProductLists = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    getSaveProductLists();
  }, [getSaveProductLists]);

  return (
    <section>
      <h1 className="text-2xl font-bold my-4 text-center">
        Saved Product Lists
      </h1>
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
    </section>
  );
};

export default Index;
