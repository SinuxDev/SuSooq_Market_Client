import PropTypes from "prop-types";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { uploadProductImages } from "../api/product";
import { message } from "antd";

const Upload = ({ editProductId, setActiveTabKey }) => {
  const [previewImg, setPreviewImg] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const onChangeHandler = (event) => {
    const selectedImages = event.target.files;
    setProductImages(selectedImages);
    const convertedImages = Array.from(selectedImages);

    const previewImgArray = convertedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImg((prev) => prev.concat(previewImgArray));
  };

  const deleteHandler = (img) => {
    const indexToDelete = previewImg.findIndex((e) => e === img);

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
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">
        Upload your product images here
      </h1>
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
            Upload
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
