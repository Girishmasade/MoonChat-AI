import React from "react";
import { Card, Table, Typography, Input, Tag, Button } from "antd";

const { Title } = Typography;

const Users = () => {
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      render: () => <Tag color="green">Active</Tag>,
    },
    {
      title: "Action",
      render: () => <Button danger>Ban</Button>,
    },
  ];

  const data = [
    { key: 1, name: "John Doe", email: "john@example.com" },
    { key: 2, name: "Jane Doe", email: "jane@example.com" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={4}>Users</Title>

      <Input placeholder="Search users..." style={{ marginBottom: 16 }} />

      <Card>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </div>
  );
};

export default Users;