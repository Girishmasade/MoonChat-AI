import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAdminSignupMutation } from "../../../redux/api/adminApi";
import {useNavigate} from 'react-router-dom'

const { Title, Text } = Typography;

const AdminSignup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [adminSignup, { isLoading }] = useAdminSignupMutation();

  const SecretKey = import.meta.env.VITE_SECRET_KEY;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    secretKey: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (values) => {
    try {
      if (values.secretKey !== SecretKey) {
        message.error("Invalid secret key!");
        return;
      }

      const response = await adminSignup(values).unwrap();
      message.success(response?.message || "Admin Registered Successfully!");
      console.log("✅ Admin Registered:", response);
    } catch (error) {
      console.error("❌ Signup Error:", error);
      message.error(error?.data?.message || "Something went wrong!");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #0a0a0a 0%, #121212 40%, #000000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(25, 25, 25, 0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "0.5rem",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Admin Signup
        </Title>

        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#b0b0b0",
          }}
        >
          Create your admin account
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: "#ddd" }}>Admin Username</span>}
            name="username"
            rules={[{ required: true, message: "Enter admin username!" }]}
          >
            <Input
              name="username"
              value={formData.username}
              onChange={onChange}
              placeholder="Enter admin username"
              style={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#ddd" }}>Email</span>}
            name="email"
            rules={[{ required: true, message: "Enter email!" }]}
          >
            <Input
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter your email"
              style={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#ddd" }}>Password</span>}
            name="password"
            rules={[{ required: true, message: "Enter password!" }]}
          >
            <Input.Password
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Enter password"
              style={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
              }}
              iconRender={(visible) =>
                visible ? (
                  <AiFillEye style={{ color: "#fff" }} />
                ) : (
                  <AiFillEyeInvisible style={{ color: "#fff" }} />
                )
              }
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#ddd" }}>Secret Key</span>}
            name="secretKey"
            rules={[{ required: true, message: "Enter secret key!" }]}
          >
            <Input
              name="secretKey"
              value={formData.secretKey}
              onChange={onChange}
              placeholder="Enter secret key"
              style={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "#f97316",
                border: "none",
                height: "42px",
                fontWeight: "600",
              }}
            >
              Register Admin
            </Button>
          </Form.Item>
        </Form>

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#aaa",
            fontFamily: "sans-serif",
          }}
        >
          Already have an admin account?{" "}
          <a href="/admin-signin" style={{ color: "#f97316", fontWeight: "500" }}>
            Sign in
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdminSignup;
