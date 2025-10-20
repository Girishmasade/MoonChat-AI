import { Button, Form, Input, message, Modal, Spin } from "antd";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAddContactMutation } from "../../redux/api/chatsApi";

const AddContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleFinish = async (values) => {
    try {
      const response = await addContact(values).unwrap();
      // console.log(response.contactUser);

      message.success("Contact added successfully");

      form.resetFields();
      setIsOpen(false);
    } catch (error) {
      const errorMsg =
        error?.message || error?.data?.message || "Something went wrong";
      message.error(errorMsg);
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        type="primary"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex gap-3 hover:from-indigo-600 hover:to-blue-600"
      >
        <AiOutlinePlus /> Add Contact
      </Button>

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          disabled={isLoading}
        >
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
            <Input placeholder="Enter Username"/>
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

          <div className="flex justify-between gap-4 mt-4">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              type="default"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddContactButton;
