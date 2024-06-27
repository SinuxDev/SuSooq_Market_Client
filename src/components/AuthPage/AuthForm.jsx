import { Button, Form, Input, message, Card } from "antd";
import { registerUser, loginUser } from "../../api/auth";

import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { setProcessing } from "../../store/slices/loaderSlice";

const AuthForm = ({ isLogin }) => {
  const { isProcessing } = useSelector((state) => state.reducer.isProcessing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnFinish = async (values) => {
    dispatch(setProcessing(true));
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
    dispatch(setProcessing(false));
  };

  return (
    <section className="w-full flex mt-28 justify-center">
      <div className="w-[450px]">
        <Card
          hoverable
          className="rounded-lg overflow-hidden shadow-lg p-2"
          title={
            isLogin ? (
              <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">
                SuSooq - Login Account
              </h1>
            ) : (
              <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">
                SuSooq - Register Account
              </h1>
            )
          }
        >
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
                disabled={isProcessing}
              >
                {isLogin && !isProcessing && "Login"}
                {!isLogin && !isProcessing && "Register"}
                {isProcessing && isLogin && "Logging in..."}
                {isProcessing && !isLogin && "Registering..."}
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
        </Card>
      </div>
    </section>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
};

export default AuthForm;
