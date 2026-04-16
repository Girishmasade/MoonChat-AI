import React from "react";
import { Card, Typography, Input, Button } from "antd";

const { Title } = Typography;

const Settings = () => {
  return (
    <div style={{ padding: 20 }}>
      <Title level={4}>Settings</Title>

      <Card title="AI Configuration">
        <Input placeholder="Model Name" style={{ marginBottom: 10 }} />
        <Input placeholder="Temperature" style={{ marginBottom: 10 }} />
        <Button type="primary">Save</Button>
      </Card>

      <Card title="API Keys" style={{ marginTop: 16 }}>
        <Input placeholder="Enter API Key" />
      </Card>
    </div>
  );
};

export default Settings;
