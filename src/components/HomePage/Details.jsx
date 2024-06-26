import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductDetails } from "../../api/product";
import cardImg from "../../images/cardImg.png";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const productID = useParams();

  const getProductDetails = useCallback(async () => {
    try {
      const response = await getSingleProductDetails(productID.id);
      if (response.isSuccess) {
        setProduct(response.product);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [productID.id]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  return (
    <section className="flex items-start justify-between mt-16">
      {product && product.category && product.seller && (
        <>
          <div className="w-1/3">
            {product && product.images && product.images.length > 0 ? (
              <>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-contain object-center overflow-hidden "
                />
                <div className="flex items-center gap-3 mt-3">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`border-3 border-blue-500 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 ${selectedImage === index && "border-blue-500 border-dashed"}`}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className="w-24 h-36 object-cover"
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <img
                  src={cardImg}
                  alt={product.name}
                  className="w-full h-96 object-contain object-center overflow-hidden "
                />
                <p className="font-medium my-2 text-red-500">
                  {" "}
                  This Product is not include img{" "}
                </p>
              </>
            )}
          </div>
          <div className="w-2/3 px-20">
            <h1 className="text-4xl font-bold"> {product.name} </h1>
            <div className="my-2">
              <h2 className="text-xl">About This Product</h2>
              <p className="text-sm"> {product.description} </p>
            </div>
            <hr className="border text-gray-300 mb-2" />
            <h1 className="font-bold mt-5">Product Information</h1>
            <div className="flex my-2 flex-wrap">
              <div className="mr-4">
                <span className="font-bold text-gray-700 text-sm">
                  Product Type :{" "}
                </span>
                <span className="text-gray-500 text-sm">
                  {" "}
                  {product.category.toUpperCase().replace("_", " ")}{" "}
                </span>
              </div>
              <div className="mr-4">
                <span className="font-bold text-gray-700 text-sm">
                  Product Used :{" "}
                </span>
                <span className="text-gray-500 text-sm">
                  {" "}
                  {product.usedFor}{" "}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 text-sm">
                  Product Price :{" "}
                </span>
                <span className="text-gray-500 text-sm"> {product.price} </span>
              </div>
            </div>
            <div>
              {product.status_details.map((status, index) => (
                <div key={index} className="flex flex-wrap">
                  {Object.keys(status).map((key) => (
                    <p key={key} className="mr-5 my-2">
                      {key.toUpperCase().replace("_", " ")} :{" "}
                      {status[key] ? "Yes" : "No"}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <hr className="border text-gray-300 mb-2" />
            <h1>Seller Information</h1>
          </div>
        </>
      )}
    </section>
  );
};

export default Details;
