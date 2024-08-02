import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { Button, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";

type ImageUploadProps = {
  setFile: (file: File | null) => void;
  placeholder: string | null;
};

const UploadAntd = ({ setFile, placeholder }: ImageUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess({ status: "success" }, file);
    }, 1000);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      setFile(newFileList[0].originFileObj as File);
    } else {
      setFile(null);
    }
  };

  return (
    <ImgCrop rotationSlider>
      <Upload action="" listType="picture" fileList={fileList} customRequest={customRequest} onChange={onChange}>
        {fileList.length < 1 && <Button icon={<UploadOutlined />}>{placeholder}</Button>}
      </Upload>
    </ImgCrop>
  );
};

export default UploadAntd;
