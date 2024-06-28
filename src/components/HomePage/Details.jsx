import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleProductDetails } from "../../api/product";
import cardImg from "../../images/cardImg.png";

import { useSelector, useDispatch } from "react-redux";
import { setProcessing } from "../../store/slices/loaderSlice";
import { RotatingLines } from "react-loader-spinner";

import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button, Form, Input, message } from "antd";

import { saveNewBid, getAllBids } from "../../api/bid";
import moment from "moment";
import { pushNotification } from "../../api/notification";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const productID = useParams();
  const navigate = useNavigate();
  const [isbidding, setIsBidding] = useState(false);
  const [bids, setBids] = useState([]);

  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.reducer.isProcessing);
  const { user } = useSelector((state) => state.reducer.user);

  const getProductDetails = useCallback(async () => {
    dispatch(setProcessing(true));
    try {
      const response = await getSingleProductDetails(productID.id);
      if (response.isSuccess) {
        setProduct(response.product);
      }
    } catch (err) {
      console.log(err.message);
    }
    dispatch(setProcessing(false));
  }, [productID.id, dispatch]);

  const getBids = useCallback(async () => {
    try {
      const response = await getAllBids(productID.id);
      if (response.isSuccess) {
        setBids(response.bids);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [productID.id]);

  const onFinishHandler = async (values) => {
    setIsBidding(true);

    values.product_id = product._id;
    values.seller_id = product.seller._id;
    values.buyer_id = user._id;

    try {
      const response = await saveNewBid(values);
      if (response.isSuccess) {
        getBids();
        message.success(response.message);

        await pushNotification({
          title: "New Bid Placed",
          message: `New Bid Placed on ${product.name} by ${user.name}`,
          product_id: product._id,
          seller_id: product.seller._id,
          phone_number: values.phone_num,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsBidding(false);
    }
  };

  useEffect(() => {
    getProductDetails();
    getBids();
  }, [getProductDetails, getBids]);

  return (
    <section
      className={`flex ${isProcessing ? "items-center justify-center" : "items-start justify-between"}  mt-16`}
    >
      {isProcessing ? (
        <div>
          <RotatingLines
            visible={isProcessing}
            height="96"
            width="96"
            color="blue"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <>
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
                      This Product is not include Images{" "}
                    </p>
                  </>
                )}
              </div>
              <div className="w-2/3 px-20">
                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-bold"> {product.name} </h1>
                  <span className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">
                    <ArrowLeftIcon
                      width={30}
                      height={20}
                      onClick={() => navigate(-1)}
                    />
                  </span>
                </div>
                <div className="my-2">
                  <h2 className="text-xl">About This Product</h2>
                  <p className="text-sm"> {product.description} </p>
                </div>
                <hr className="border text-gray-300 mb-2" />
                <h1 className="font-bold mt-5 text-2xl">Product Information</h1>
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
                    <span className="text-gray-500 text-sm">
                      {" "}
                      {product.price}{" "}
                    </span>
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
                <h1 className="text-xl font-bold">Seller Information</h1>
                <h3> From : {product.seller.name} </h3>
                <h3> Email : {product.seller.email} </h3>
                <p>
                  {" "}
                  {product.seller.name} is certified product owner. Trust By
                  Many Customers{" "}
                </p>
                <hr className="border text-gray-300 my-2" />
                <h1 className="text-xl font-bold my-2">Recent Bids</h1>
                <div className="flex flex-wrap items-center justify-between">
                  {bids.length === 0 && <> No Bids Are Not place yet </>}
                  {bids &&
                    bids.map((bid, index) => (
                      <div key={index} className="my-3 w-1/3">
                        <h5 className="font-medium text-base">
                          {" "}
                          {bid.buyer_id.name}{" "}
                        </h5>
                        <p className="text-xs text-gray-500">
                          {" "}
                          {moment(bid.createdAt).format("L")}{" "}
                        </p>
                        <p className="text-gray-600 text-sm font-medium">
                          {" "}
                          {bid.comment}{" "}
                        </p>
                      </div>
                    ))}
                </div>
                {user && user._id !== product.seller._id && (
                  <>
                    <hr className="border text-gray-300 my-2" />

                    <h1 className="text-xl font-bold my-2">Place Your Bids</h1>
                    <Form className="w-full" onFinish={onFinishHandler}>
                      <div className="flex items-center gap-2 w-full">
                        <Form.Item
                          className="w-1/2"
                          name="comment"
                          rules={[
                            {
                              required: true,
                              message: "Please input your comment!",
                            },
                            {
                              min: 3,
                              message:
                                "Comment must be at least 3 characters long",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input placeholder="Write your comment..." />
                        </Form.Item>

                        <Form.Item
                          className="w-1/3"
                          name="phone_num"
                          rules={[
                            {
                              required: true,
                              message: "Please input your phone number!",
                            },
                            {
                              min: 10,
                              message:
                                "Phone number must be at least 10 characters long",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input
                            placeholder="Enter your phone number"
                            type="number"
                          />
                        </Form.Item>

                        <Form.Item>
                          {!isbidding && (
                            <Button type="primary" htmlType="submit">
                              <PaperAirplaneIcon
                                width={20}
                                height={20}
                                className="rotate-[-45deg]"
                              />
                              Send
                            </Button>
                          )}
                          {isbidding && (
                            <Button type="primary" htmlType="submit">
                              <PaperAirplaneIcon
                                width={20}
                                height={20}
                                className="rotate-[-45deg]"
                              />
                              Submitting......
                            </Button>
                          )}
                        </Form.Item>
                      </div>
                    </Form>
                  </>
                )}{" "}
                {!user && (
                  <Link to={"/login"}>
                    <p className="my-5 font-bold text-2xl text-center text-red-600">
                      Login Or Register to bid this product
                    </p>
                  </Link>
                )}
                {user._id === product.seller._id && (
                  <p className="my-5 font-bold text-2xl text-center text-red-600">
                    You cannot bid your own product
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Details;
