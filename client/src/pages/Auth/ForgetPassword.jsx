import { Button, Form, Input, message, Spin, Typography } from "antd";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForgetPassMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const [forgetPass, { isLoading }] = useForgetPassMutation();

  const onSubmit = async (values) => {
    try {
      const response = await forgetPass(values).unwrap();
    //   console.log(response || "Password updated successfully");
      message.success(response.message || "Password updated successfully");
      navigate("/signin")
    } catch (error) {
    //   console.log(error);
      message.error(error.message);
    }
  };

  const handleLogin = () => {
    navigate("/signin")
  }

if (isLoading) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top left, #0a0a0a 0%, #121212 40%, #000000 100%)",
        color: "#fff",
      }}
    >
      <Spin
        size="large"
        tip={<Text style={{ color: "#3b82f6", fontSize: "18px" }}>Updating Password...</Text>}
        style={{ marginBottom: "1rem" }}
      />
    </div>
  );
}
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
            Forgot Your Password
          </Title>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#b0b0b0",
            }}
          >
            Update your password
          </Text>

          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label={<span style={{ color: "#ddd" }}>Email</span>}
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                name="email"
                value={email}
                onChange={onChange}
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
                { required: true, message: "Please enter your new password!" },
              ]}
            >
              <Input.Password
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                style={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  color: "#fff",
                }}
                iconRender={(visible) =>
                  visible ? <AiFillEye /> : <AiFillEyeInvisible />
                }
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#ddd" }}>Confirm Password</span>}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm your password"
                style={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  color: "#fff",
                }}
                iconRender={(visible) =>
                  visible ? <AiFillEye /> : <AiFillEyeInvisible />
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
                Update Password
              </Button>
            </Form.Item>
             <Form.Item>
              <Button
                type="primary"
                onClick={handleLogin}
                block
                style={{
                  background: "linear-gradient(90deg, #6b7280, #9ca3af)" ,
                  border: "none",
                  height: "42px",
                  fontWeight: "600",
                }}
              >
                Back to Signin Page
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
