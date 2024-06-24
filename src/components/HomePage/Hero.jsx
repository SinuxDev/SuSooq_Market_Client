import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Hero = () => {
  return (
    <>
      <div className="w-full text-center my-2">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          <q>Rich With SuSooq</q>
        </h1>
        <p className="text-lg font-medium text-gray-600 max-w-xl mx-auto mb-4">
          Explore a wide range of products. Secure transactions. Connect with a
          vibrant community. Enjoy exclusive deals and a seamless shopping
          experience. Join us today!
        </p>
        <div className="max-w-sm mx-auto relative">
          <input type="text" className="bg-gray-200 p-2 rounded-xl w-full" />
          <MagnifyingGlassIcon
            width={20}
            height={20}
            className="text-blue-600 absolute top-2 right-2 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
