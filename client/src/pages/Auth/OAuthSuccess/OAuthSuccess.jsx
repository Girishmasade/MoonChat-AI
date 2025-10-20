import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/app/authSlice";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save token first
      localStorage.setItem("token", token);

      // ✅ Fetch user data using token
      fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            dispatch(setCredentials({ user: data.user, token }));
            navigate("/chat-dashboard");
          } else {
            navigate("/siginin");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          navigate("/siginin");
        });
    } else {
      navigate("/siginin");
    }
  }, [dispatch, navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
