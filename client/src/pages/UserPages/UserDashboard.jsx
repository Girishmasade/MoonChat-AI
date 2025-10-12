import React, { useRef, useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import { UserOutlined, RobotOutlined, MessageOutlined } from "@ant-design/icons";
import Globe from "react-globe.gl";

const { Title, Text } = Typography;

const UserDashboard = () => {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth * 0.9, height: 400 });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [globeRef]);

  return (
    <div className="p-6 bg-[#f9fafc] min-h-screen">
      {/* Welcome Section */}
      <div className="flex flex-col items-center justify-center mb-10">
        <Title level={2} className="text-gray-800 text-center">
          Welcome to AI Chat System 🤖
        </Title>
        <Text className="text-gray-500 text-center">
          Interact, Explore, and Connect with AI globally
        </Text>
      </div>

      {/* 3D Globe */}
      <div className="w-full flex justify-center mb-10">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
        />
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-md rounded-2xl">
            <Statistic
              title="Active Users"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-md rounded-2xl">
            <Statistic
              title="Active AI Bots"
              value={24}
              prefix={<RobotOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-md rounded-2xl">
            <Statistic
              title="Messages Today"
              value={534}
              prefix={<MessageOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
