import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  deleteProductImages,
  getProductImages,
  uploadProductImages,
} from "../api/product";
import { message } from "antd";

const Upload = ({ editProductId, setActiveTabKey }) => {
  const [previewImg, setPreviewImg] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedImages, setSavedImages] = useState([]);

  const [selectedImgCount, setSelectedImgCount] = useState(0);

  const getSavedImages = async (product_id) => {
    try {
      const response = await getProductImages(product_id);

      if (response.isSuccess) {
        setSavedImages(response.SavedImages.images);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (editProductId) {
      getSavedImages(editProductId);
    }
  }, [editProductId]);

  const onChangeHandler = (event) => {
    const selectedImages = event.target.files;
    const selectedImagesArray = Array.from(selectedImages);
    setProductImages(selectedImages);

    //update selected image count
    setSelectedImgCount((prev) => prev + selectedImagesArray.length);

    const convertedImages = Array.from(selectedImages);

    const previewImgArray = convertedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImg((prev) => prev.concat(previewImgArray));
  };

  const deleteHandler = (img) => {
    const indexToDelete = previewImg.findIndex((e) => e === img);

    //update selected image count
    setSelectedImgCount((prev) => prev - 1);

    if (indexToDelete !== -1) {
      const updatedSelectedImages = [...productImages];
      updatedSelectedImages.splice(indexToDelete, 1);

      setProductImages(updatedSelectedImages);

      setPreviewImg(previewImg.filter((image) => image !== img));
      URL.revokeObjectURL(img);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!(selectedImgCount > 1)) {
      return message.error("Please select at least 2 images to upload");
    }

    setIsLoading(true);

    const formData = new FormData();

    for (let i = 0; i < productImages.length; i++) {
      formData.append("product_images", productImages[i]);
    }

    formData.append("product_id", editProductId);

    try {
      const response = await uploadProductImages(formData);
      if (response.isSuccess) {
        message.success(response.message);
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    setIsLoading(false);
  };

  const savedImagesDeleteHandler = async (img) => {
    setSavedImages((prev) => prev.filter((e) => e !== img));

    const encodedImg = encodeURIComponent(img);

    try {
      const response = await deleteProductImages({
        product_id: editProductId,
        imgToDelete: encodedImg,
      });
      if (response.isSuccess) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Upload your product images here
      </h1>
      <div className="mt-2">
        <h1 className="text-base font-medium mb-5">Saved Image in Cloud</h1>
        {savedImages.length > 0 ? (
          <div className="flex gap-2 mb-6">
            {savedImages.map((e) => (
              <div key={e} className="basis-1/6 h-32 relative mx-1">
                <img
                  src={e}
                  alt={e}
                  className="w-full h-full object-cover rounded-md hover:translate-x-1 hover:translate-y-1 cursor-pointer transition-transform duration-300 ease-in-out shadow-2xl"
                />
                <TrashIcon
                  width={20}
                  height={20}
                  className="absolute z-20 bottom-4 right-3 text-red-600 cursor-pointer"
                  onClick={() => savedImagesDeleteHandler(e)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 text-xl mb-2">No image found</p>
        )}
      </div>
      <hr />
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col items-start w-full">
          <label
            htmlFor="upload"
            className="cursor-pointer p-3 rounded-md border-dashed  border-2 border-blue-600 font-medium my-3 text-blue-600"
          >
            Choose Image From Your Device
          </label>
          <input
            type="file"
            hidden
            id="upload"
            name="product_images"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangeHandler}
          />
          <div className="flex gap-2 flex-wrap my-2 w-full">
            {previewImg &&
              previewImg.map((img, index) => (
                <div key={index} className="w-1/4 mr-5 relative">
                  <img
                    src={img}
                    alt={img.name}
                    className="w-full h-40 shadow-2xl object-cover rounded-md my-2 hover:translate-x-1 hover:translate-y-1 cursor-pointer transition-transform duration-300 ease-in-out"
                  />
                  <TrashIcon
                    width={20}
                    height={20}
                    className="absolute z-20 bottom-4 right-3 text-red-600 cursor-pointer"
                    onClick={() => deleteHandler(img)}
                  />
                </div>
              ))}
          </div>
          <button className="bg-blue-600 text-white p-2 rounded-md font-medium">
            {isLoading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
      </form>
    </section>
  );
};

Upload.propTypes = {
  editProductId: PropTypes.any,
  setActiveTabKey: PropTypes.func,
};

export default Upload;
