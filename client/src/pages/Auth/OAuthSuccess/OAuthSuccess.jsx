import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/app/authSlice";
import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      console.error("No token found in query params");
      return navigate("/signin"); 
    }

    localStorage.setItem("token", token);

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        const user = response.data?.data?.user;

        if (user) {
          dispatch(setCredentials({ data: { user, token } }));
          localStorage.setItem("userInfo", JSON.stringify(user));

          console.log("User and token saved in localStorage:", user);
          navigate("/chat-dashboard");
        } else {
          console.warn("User data missing in response");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/signin");
      }
    };

    fetchUserProfile();
  }, [dispatch, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1f1c2c, #928DAB)",
        color: "#fff",
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 40, color: "#fff" }} spin />
        }
        size="large"
      />
      <Text
        style={{
          marginTop: 20,
          color: "#fff",
          fontSize: 18,
          letterSpacing: 0.5,
        }}
      >
        Logging you in... please wait
      </Text>
    </div>
  );
};

export default OAuthSuccess;
