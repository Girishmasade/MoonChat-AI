import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const UserLogin = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#121212] px-4"
      style={{ color: "#fff" }}
    >
      <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-lg shadow-lg">
        <Title
          level={2}
          style={{
            background: "linear-gradient(to right, #2563eb, #14b8a6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          Welcome Back
        </Title>
        <p type="secondary" className="block text-sm text-center mb-6 text-gray-200">
          Sign in to your AI chat account
        </p>

        <Form
          layout="vertical"
          name="login"
          initialValues={{ remember: true }}
          onFinish={(values) => console.log("Login values:", values)}
        >
          <Form.Item
            label={<span style={{ color: "white" }}>Email</span>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "white" }}>Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div className="flex justify-end mb-4">
            <Link href="#" style={{ color: "#60a5fa" }}>
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
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

        <Divider plain style={{ color: "#555" }}>
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
          <Text className="text-gray-400">Don't have an account?</Text>{" "}
          <Link href="#" style={{ color: "#60a5fa" }}>
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
