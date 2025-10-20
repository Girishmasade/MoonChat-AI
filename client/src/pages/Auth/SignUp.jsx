import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import {
  useGoogleLoginQuery,
  useRegisterUserMutation,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/app/authSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const { Title, Text, Link } = Typography;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = () => {
    const userData = { username, email, password };
    registerUser(userData)
      .unwrap()
      .then((response) => {
        // console.log("Registration successful:", response);
        // dispatch(setCredentials(response));
        navigate("/siginin");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const onGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, "_self");
  };

  const onGithubLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/github`, "_self");
  };

  if (isLoading)
    return (
      <div className="text-center mt-20 text-lg text-white">Loading...</div>
    );

  return (
    <>
      {/* Inline styles to make placeholder text white */}
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
            background: "rgba(25, 25, 25, 0.85)", // glassmorphic effect
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
            transition: "all 0.3s ease",
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
            Create Account
          </Title>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#b0b0b0",
            }}
          >
            Create your AI Chat account
          </Text>

          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label={<span style={{ color: "#ddd" }}>Username</span>}
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input
                value={username}
                name="username"
                onChange={onChange}
                placeholder="Enter your username"
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
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                value={email}
                name="email"
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

            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <Link
                href="#"
                style={{
                  color: "#3b82f6",
                }}
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
                  background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                  border: "none",
                  height: "42px",
                  fontWeight: "600",
                }}
              >
                Sign Up
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
            <Text style={{ color: "#aaa" }}>Already have an account?</Text>{" "}
            <Link
              href="/siginin"
              style={{ color: "#3b82f6", fontWeight: "500" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
