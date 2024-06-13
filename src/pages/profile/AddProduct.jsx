import { Button, Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import PropTypes from "prop-types";
const { TextArea } = Input;

import { getSoldProducts } from "../../api/product";

const AddProduct = ({ setActiveTabKey, getProducts }) => {
  const [form] = Form.useForm();

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

  const checkBoxOptions = [
    {
      label: "Warranty",
      value: "warranty",
    },
    {
      label: "Negotiable",
      value: "negotiable",
    },
    {
      label: "Free Delivery",
      value: "free_delivery",
    },
    {
      label: "Cash on Delivery",
      value: "cash_on_delivery",
    },
    {
      label: "Limited Stock",
      value: "limited_stock",
    },
  ];

  const handleOnFinish = async (values) => {
    try {
      const response = await getSoldProducts(values);
      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        getProducts();
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
      <h1 className="text-2xl font-bold my-2">What you want to sales?</h1>
      <Form layout="vertical" onFinish={handleOnFinish} form={form}>
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please input your Product Name!",
            },
            {
              min: 3,
              message: "Product Name must be at least 3 characters long",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Product Name..."></Input>
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="product_description"
          rules={[
            {
              required: true,
              message: "Please input your Product Description!",
            },
            {
              min: 10,
              message:
                "Product Description must be at least 10 characters long",
            },
          ]}
          hasFeedback
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            className="overflow-y-auto p-2"
            placeholder="Product Description..."
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Product Price"
              name="product_price"
              rules={[
                {
                  required: true,
                  message: "Please input your Product Price!",
                },
                {
                  min: 1,
                  message: "Product Price must be contains at least 1 digit",
                },
              ]}
              hasFeedback
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Product Category"
              name="product_category"
              rules={[
                {
                  required: true,
                  message: "Please select your Product Category!",
                },
              ]}
              hasFeedback
            >
              <Select defaultValue={""} options={CatagoriesOptions} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_used_for"
              label="Product Used For"
              rules={[
                {
                  required: true,
                  message: "Product Used Time is required!",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="eg., 3 months ago"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="product_status" label="Product Status">
          <Checkbox.Group options={checkBoxOptions} defaultValue={""} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="p-4">
            {" "}
            Sell Products{" "}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

AddProduct.propTypes = {
  setActiveTabKey: PropTypes.func,
  getProducts: PropTypes.func,
};

export default AddProduct;
