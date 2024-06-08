import { Button, Form, Input } from "antd";

import PropTypes from "prop-types";

const AuthForm = ({ isLogin }) => {
  const handleOnFinish = async (values) => {
    console.log(values);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-[450px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          SuSooq.IO - {isLogin ? "Login" : "Register"}
        </h1>
        <Form
          layout="vertical"
          onFinish={handleOnFinish}
          initialValues={{
            remember: true,
          }}
        >
          {!isLogin && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
                {
                  min: 3,
                  message: "Name must be at least 3 characters long",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="username...."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="email...."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 5,
                message: "Password must be at least 5 characters long",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password...."></Input.Password>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
};

export default AuthForm;
