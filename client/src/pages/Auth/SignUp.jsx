import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const SignUp = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4"
      style={{ color: "#fff" }}
    >
      <div className="w-full max-w-md bg-[#1e1e1e73] p-8 rounded-lg shadow-lg">
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
          Create an Account
        </Title>
        <p type="secondary" className="block text-sm text-center mb-6 text-gray-200">
        Join our AI-powered chat platform
        </p>

        <Form
          layout="vertical"
          name="login"
          autoComplete="off"
          initialValues={{ remember: true }}
          onFinish={(values) => console.log("Login values:", values)}
        >

          <Form.Item
          
            label={<span style={{ color: "white" }}>Username</span>}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
            autoComplete="off"
            placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "white" }}>Email</span>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
             autoComplete="off"
            placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "white" }}>Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
             autoComplete="off"
            placeholder="Enter your password" />
          </Form.Item>

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
              Sign Up
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
          <Text className="text-gray-400">Already have an account?</Text>{" "}
          <Link href="/login" style={{ color: "#60a5fa" }}>
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
