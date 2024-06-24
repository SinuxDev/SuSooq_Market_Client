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

  console.log(products);

  return (
    <>
      <Hero />
      <Filter />
      <Cards products={products} />
    </>
  );
};

export default Index;
