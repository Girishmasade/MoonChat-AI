import React, { useState } from "react";
import { Upload, Button, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    setFileList(info.fileList);

    if (info.file.status === "uploading") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  return (
    <div>
      <Upload
        action=""
        fileList={fileList}
        onChange={handleChange}
        multiple
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
      >
        <Button
          style={{ background: "transparent", outline: "none", border: "none" }}
          disabled={loading}
        >
          📎
        </Button>
      </Upload>

      {loading && (
        <div style={{ marginTop: 16 }}>
          <Spin tip="Uploading..." />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
