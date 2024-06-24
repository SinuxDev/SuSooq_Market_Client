import {
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  GlobeAltIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <>
      <div className="w-full text-center my-6">
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
        <div className="flex items-center justify-between max-w-6xl mx-auto mt-12 mb-20">
          <div className="flex items-center flex-col w-1/3">
            <div className="bg-blue-500 p-1 w-1/6 mx-auto rounded-xl mb-2">
              <CloudArrowUpIcon
                width={40}
                height={40}
                className="text-gray-300 mx-auto "
              />
            </div>
            <p className=" text-black font-extrabold text-2xl">Customizable</p>
            <p className="text-gray-500 font-semibold italic">
              Free website designs to launch your store quickly and easily.
            </p>
          </div>
          <div className="flex items-center flex-col w-1/3">
            <div className="bg-blue-500 p-1 w-1/6 mx-auto rounded-xl mb-2">
              <LockClosedIcon
                width={40}
                height={40}
                className="text-gray-300 mx-auto "
              />
            </div>
            <p className=" text-black font-extrabold text-2xl">Customizable</p>
            <p className="text-gray-500 font-semibold italic">
              Free website designs to launch your store quickly and easily.
            </p>
          </div>
          <div className="flex items-center flex-col w-1/3">
            <div className="bg-blue-500 p-1 w-1/6 mx-auto rounded-xl mb-2">
              <GlobeAltIcon
                width={40}
                height={40}
                className="text-gray-300 mx-auto "
              />
            </div>
            <p className=" text-black font-extrabold text-2xl">Customizable</p>
            <p className="text-gray-500 font-semibold italic">
              Free website designs to launch your store quickly and easily.
            </p>
          </div>
        </div>
      </div>
      <hr className="border border-solid mb-12" />
    </>
  );
};

export default Hero;
