import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAdminSignupMutation } from "../../../redux/api/adminApi";

const { Title, Text } = Typography;

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const form = Form.useForm();

  const OnChange = (e) => {
    const [name, values] = e.target;
    if (name === "name") setName(values);
    if (name === "email") setEmail(values);
    if (name === "password") setPassword(values);
    if (name === "secretKey") setSecretKey(values);
  };

  const [adminSignup, { isLoading }] = useAdminSignupMutation();

  const handleSubmit = (values) => {
    console.log("Admin Data:", values);
    // alert("Admin registered! (UI only, no backend)");
  };

  return (
    <>
      <style>
        {`
          input::placeholder, 
          .ant-input::placeholder, 
          .ant-input-password input::placeholder {
            color: #ffffff !important;
            opacity: 0.7;
          }
        `}
      </style>

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

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label={<span style={{ color: "#ddd" }}>Admin Name</span>}
              name="name"
              rules={[{ required: true, message: "Enter admin name!" }]}
            >
              <Input
                value={name}
                name="name"
                onChange={OnChange}
                placeholder="Enter admin name"
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
                value={email}
                name="email"
                onChange={OnChange}
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
                value={password}
                name="password"
                onChange={OnChange}
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
                value={secretKey}
                name="secretKey"
                onChange={OnChange}
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
            <a
              href="/admin-signin"
              style={{ color: "#f97316", fontWeight: "500" }}
            >
              Sign in
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSignup;
