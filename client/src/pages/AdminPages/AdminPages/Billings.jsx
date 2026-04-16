import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const Billings = () => {
  return (
    <div style={{ padding: 20 }}>
      <Title level={4}>Billing</Title>

      <Card>
        <Text>Total Revenue</Text>
        <Title level={2}>₹12,340</Title>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Text>Active Subscriptions</Text>
        <Title level={2}>320</Title>
      </Card>
    </div>
  );
};

export default Billings;