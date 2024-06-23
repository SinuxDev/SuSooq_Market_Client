import { Card, BarList, Title, Flex, Bold, Text } from "@tremor/react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// BarLists => Products By Categories

const BarLists = ({ products }) => {
  const [productCateogries, setProductCategories] = useState([]);

  useEffect(() => {
    const categories = {};
    products.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = 0;
      }

      categories[product.category] += 1;
    });

    const data = Object.entries(categories).map(([category, count]) => ({
      name: category.toUpperCase().replace("_", " "),
      value: count,
    }));

    setProductCategories(data);
  }, [setProductCategories, products]);

  return (
    <Card className="mx-auto mt-7 w-full">
      <Title className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mb-7">
        {" "}
        Product Count By Categories{" "}
      </Title>
      <Flex className="mt-4">
        <Text>
          <Bold> Product Categories </Bold>
        </Text>
        <Text>
          <Bold> Counts </Bold>
        </Text>
      </Flex>
      <BarList data={productCateogries} className="mt-2" />
    </Card>
  );
};

BarLists.propTypes = {
  products: PropTypes.any,
};

export default BarLists;
