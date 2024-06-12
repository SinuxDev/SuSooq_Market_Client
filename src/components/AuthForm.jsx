import { Button, Form, Input, message } from "antd";
import { registerUser, loginUser } from "../api/auth";

import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const AuthForm = ({ isLogin }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnFinish = async (values) => {
    setSubmitting(true);
    try {
      const response = await (isLogin
        ? loginUser(values)
        : registerUser(values));

      if (response.isSuccess) {
        message.success(response.message);

        localStorage.setItem("token", response.token);
        dispatch(setUser(response.token));

        navigate(isLogin ? "/" : "/login");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    setSubmitting(false);
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
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={submitting}
            >
              {isLogin && !submitting && "Login"}
              {!isLogin && !submitting && "Register"}
              {submitting && "Submitting..."}
            </Button>
          </Form.Item>
          <p>
            {isLogin ? (
              <p>
                Do not have an account ?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-blue-600 hover:text-blue-400"
                >
                  Register Here
                </Link>
              </p>
            ) : (
              <p>
                Already have an account ?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 hover:text-blue-400"
                >
                  Login Here
                </Link>
              </p>
            )}
          </p>
        </Form>
      </div>
    </section>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
};

export default AuthForm;
