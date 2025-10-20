import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/app/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const { Title, Text, Link } = Typography;

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      dispatch(setCredentials(response));
      message.success("Logged in successfully!");
      navigate("/chat-dashboard");
    } catch (error) {
      message.error(error?.data?.message || "Invalid credentials!");
    }
  };

  // OAuth login redirects
  const onGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, "_self");
  };

  const onGithubLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/github`, "_self");
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
              marginBottom: "0",
              background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
            }}
          >
            Welcome Back
          </Title>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#b0b0b0",
            }}
          >
            Sign in to your AI Chat account
          </Text>

          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label={<span style={{ color: "#ddd" }}>Email</span>}
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                value={email}
                name="email"
                onChange={onChange}
                placeholder="Enter your email"
                className="placeholder:text-white"
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
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                value={password}
                name="password"
                onChange={onChange}
                placeholder="Enter your password"
                style={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  color: "#fff",
                }}
                iconRender={(visible) =>
                  visible ? (
                    <span style={{ color: "#fff" }}>
                      <AiFillEye />
                    </span>
                  ) : (
                    <span style={{ color: "#fff" }}>
                      <AiFillEyeInvisible />
                    </span>
                  )
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                  border: "none",
                  height: "42px",
                  fontWeight: "600",
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider style={{ borderColor: "#333", color: "#888" }}>
            OR CONTINUE WITH
          </Divider>

          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              onClick={onGoogleLogin}
              icon={<GoogleOutlined />}
              block
              style={{
                background: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
              }}
            >
              Google
            </Button>
            <Button
              onClick={onGithubLogin}
              icon={<GithubOutlined />}
              block
              style={{
                background: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
              }}
            >
              GitHub
            </Button>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Text style={{ color: "#aaa" }}>Don’t have an account?</Text>{" "}
            <Link
              href="/signup"
              style={{ color: "#3b82f6", fontWeight: "500" }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserLogin;
