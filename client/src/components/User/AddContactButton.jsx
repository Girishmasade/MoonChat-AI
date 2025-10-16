import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form values:", values);

    const existingContacts =
      JSON.parse(localStorage.getItem("contactData")) || [];
    const updatedContacts = [...existingContacts, values];

    localStorage.setItem("contactData", JSON.stringify(updatedContacts));
    console.log("Saved contacts:", updatedContacts);

    form.resetFields();
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        type="primary"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex gap-3 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600"
      >
        <AiOutlinePlus /> Add Contact
      </Button>

      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="flex flex-col pb-3 gap-2">
            <h1 className="font-semibold text-lg">Add Contact</h1>
            <p className="text-sm text-gray-500">
              Enter details to add a new contact.
            </p>
          </div>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input placeholder="Enter Username" autoFocus />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item label="Avatar" rules={[{ required: true }]}>
            <Input placeholder="Enter link" autoFocus />
          </Form.Item>

          <div className="flex justify-between gap-4">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              type="default"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="w-full">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddContactButton;
