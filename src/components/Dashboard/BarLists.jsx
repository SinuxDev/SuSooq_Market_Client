import { Card, BarList, Title } from "@tremor/react";

const data = [
  { name: "Shin", value: 100 },
  { name: "Kyu", value: 200 },
  { name: "Lee", value: 300 },
];

const BarLists = () => {
  return (
    <Card className="mx-auto mt-7 w-full">
      <Title className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mb-7">
        {" "}
        Product Count By Categories{" "}
      </Title>
      <BarList data={data} className="mt-2" />
    </Card>
  );
};

export default BarLists;
