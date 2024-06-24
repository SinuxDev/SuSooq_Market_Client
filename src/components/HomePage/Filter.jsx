const Filter = () => {
  const CatagoriesOptions = [
    {
      value: "electronics",
      label: "Electronics",
    },
    {
      value: "fashion",
      label: "Fashion",
    },
    {
      value: "home_garden",
      label: "Home & Garden",
    },
    {
      value: "health_beauty",
      label: "Health & Beauty",
    },
    {
      value: "sports_outdoors",
      label: "Sports & Outdoors",
    },
    {
      value: "toys_hobbies",
      label: "Toys & Hobbies",
    },
    {
      value: "automotive",
      label: "Automotive",
    },
    {
      value: "books_media",
      label: "Books & Media",
    },
    {
      value: "collectibles_art",
      label: "Collectibles & Art",
    },
    {
      value: "food_beverages",
      label: "Food & Beverages",
    },
  ];
  return (
    <>
      <div className="flex items-center gap-2 my-8 max-w-3xl whitespace-nowrap mx-auto flex-wrap justify-center">
        {CatagoriesOptions.map((option) => (
          <p
            key={option.value}
            className="text-xs font-semibold bg-blue-600 text-white px-2 py-2 rounded-xl"
          >
            {" "}
            {option.label}{" "}
          </p>
        ))}
      </div>
    </>
  );
};

export default Filter;
