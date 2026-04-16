import React from "react";
import { Card, List, Typography } from "antd";

const { Title } = Typography;

const AdminChats = () => {
  return (
    <div style={{ padding: 20 }}>
      <Title level={4}>Chats</Title>

      <Card>
        <List
          dataSource={["User1 ↔ User2", "User3 ↔ User4"]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </div>
  );
};

export default AdminChats;