import PropTypes from "prop-types";

import { Card, Badge, Text, Metric } from "@tremor/react";

const Cards = ({ title, count, icon, note }) => {
  return (
    <Card className="mx-auto max-w-sm mt-4">
      <div className="flex items-center justify-between">
        <Text className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {title}
        </Text>
        <Badge size="xs" icon={icon}>
          {note}
        </Badge>
      </div>
      <Metric className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        {count}
      </Metric>
    </Card>
  );
};

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
  note: PropTypes.string,
};

export default Cards;
