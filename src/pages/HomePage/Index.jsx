import Hero from "../../components/HomePage/Hero";
import Filter from "../../components/HomePage/Filter";
import Cards from "../../components/HomePage/Cards";
import { useCallback, useEffect, useState } from "react";
import { getPublicProducts } from "../../api/product";
import { message } from "antd";

const Index = () => {
  const [products, setProducts] = useState([]);

  const getAllPublicProducts = useCallback(async () => {
    try {
      const response = await getPublicProducts();
      if (response.isSuccess) {
        setProducts(response.products);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }, []);

  useEffect(() => {
    getAllPublicProducts();
  }, [getAllPublicProducts]);

  return (
    <>
      <Hero setProducts={setProducts} />
      <Filter products={products} />
      <div className="flex max-w-4xl flex-wrap mx-auto flex-row">
        {products.map((product) => (
          <Cards key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Index;
