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
                <p> This Product is not include img </p>
              </>
            )}
          </div>
          <div className="w-2/3 px-20">
            <h1> {product.name} </h1>
            <h1> {product.description} </h1>
            <hr />
            <h1>Informations</h1>
            <div>
              <div>
                <p>Type</p>
                <p>Used For</p>
              </div>
              <div>
                <p> {product.category.toUpperCase().replace("_", " ")} </p>
                <p> {product.usedFor} </p>
              </div>
            </div>
            <div>
              {product.status_details.map((status, index) => (
                <div key={index}>
                  {Object.keys(status).map((key) => (
                    <p key={key}>
                      {key.replace("_", " ")} : {status[key] ? "Yes" : "No"}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <hr />
            <h1>Seller Information</h1>
          </div>
          {/* Remining , So Tired , Need to Relax , Can't even write UI */}
        </>
      )}
    </section>
  );
};

export default Details;
