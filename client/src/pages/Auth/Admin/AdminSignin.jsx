import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const { Title, Text } = Typography;

const AdminSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  console.log(formData);
  

  const OnChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = (values) => {
    console.log("Admin Signin:", values);
    alert("Admin sign-in attempted! (UI only)");
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
            Admin Sign In
          </Title>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#b0b0b0",
            }}
          >
            Access your admin account
          </Text>

          <Form
          form={form} 
          layout="vertical" 
          onFinish={handleSubmit}
           autoComplete="off"
          >
            <Form.Item
              label={<span style={{ color: "#ddd" }}>Email</span>}
              name="email"
              rules={[{ required: true, message: "Enter email!" }]}
            >
              <Input
                name="email"
                value={formData.email}
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
                name="password"
                value={formData.password}
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
                Sign In
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
            Don't have an admin account?{" "}
            <a
              href="/admin-signup"
              style={{ color: "#f97316", fontWeight: "500" }}
            >
              Sign up
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSignin;
