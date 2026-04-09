import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = ({ text = "Loading..." }) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40 }} spin />
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <Spin indicator={antIcon} />
        <p style={styles.text}>{text}</p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  },
  card: {
    padding: "30px 50px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  text: {
    marginTop: "15px",
    fontSize: "16px",
    letterSpacing: "1px",
  },
};

export default Loader;