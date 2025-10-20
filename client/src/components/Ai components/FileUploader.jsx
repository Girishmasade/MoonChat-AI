import React, { useState } from "react";
import { Upload, Button, message as AntMessage, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSendChatMutation } from "../../redux/api/aiChatApi";
import { useSelector } from "react-redux";

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [sendChat] = useSendChatMutation();

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) return;

    const formData = new FormData();
    formData.append("senderId", user?._id);
    fileList.forEach((file) => formData.append("media", file.originFileObj));

    try {
      setUploading(true);
      const response = await sendChat(formData).unwrap();

      if (response?.data?.AiMessage) {
        AntMessage.success("Files uploaded successfully");
        setFileList([]);
        // console.log("AI Response:", response.data.AiMessage.messages);
      }
    } catch (error) {
      console.error("Upload error:", error);
      AntMessage.error("Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Upload
        fileList={fileList}
        onChange={handleFileChange}
        multiple
        beforeUpload={() => false} // prevent automatic upload
        showUploadList
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
      >
        <Button disabled={uploading}>
          <UploadOutlined /> Attach
        </Button>
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={uploading || fileList.length === 0}
      >
        {uploading ? <Spin size="small" /> : "Send"}
      </Button>
    </div>
  );
};

export default FileUploader;
