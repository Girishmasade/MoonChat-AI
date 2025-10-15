import React from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/app/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/api/authApi";

const { Title, Text, Link } = Typography;

const UserLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      message.success("Logged in successfully!");
      console.log("Login successful:", response);
      dispatch(setCredentials(response));
      navigate("/chat-dashboard");
    } catch (error) {
      message.error(error?.data?.message || "Invalid credentials!");
      console.log("Login failed:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="w-full max-w-md bg-gray-100 dark:bg-[#141414b3] p-8 rounded-lg shadow-lg transition-colors duration-300">
        <Title
          level={2}
          className="text-center mb-0"
          style={{
            background: "linear-gradient(to right, #2563eb, #14b8a6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome Back
        </Title>

        <p className="block text-sm text-center mb-6 text-gray-700 dark:text-gray-300">
          Sign in to your AI chat account
        </p>

        <Form
          layout="vertical"
          name="login"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            label={<span className="text-gray-800 dark:text-white">Email</span>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              value={email}
              name="email"
              onChange={onChange}
              autoComplete="email"
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-800 dark:text-white">Password</span>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              name="password"
              onChange={onChange}
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </Form.Item>

          <div className="flex justify-end mb-4">
            <Link
              href="#"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              style={{
                background: "linear-gradient(to right, #2563eb, #14b8a6)",
                border: "none",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider plain className="text-gray-500 dark:text-gray-400">
          OR CONTINUE WITH
        </Divider>

        <div className="flex gap-4">
          <Button icon={<GoogleOutlined />} block>
            Google
          </Button>
          <Button icon={<GithubOutlined />} block>
            GitHub
          </Button>
        </div>

        <div className="text-center mt-6">
          <Text className="text-gray-700 dark:text-gray-400">
            Don’t have an account?
          </Text>{" "}
          <Link
            href="/signup"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
