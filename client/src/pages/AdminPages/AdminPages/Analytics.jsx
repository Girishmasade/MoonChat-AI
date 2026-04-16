import React from "react";
import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

const Analytics = () => {
  return (
    <div style={{ padding: 20 }}>
      <Title level={4}>Analytics</Title>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="User Growth">Chart Here</Card>
        </Col>
        <Col span={12}>
          <Card title="AI Usage">Chart Here</Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;