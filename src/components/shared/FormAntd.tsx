"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Input, InputNumber, Select } from "antd";
import UploadAntd from "../shared/UploadAntd";
import SubmitButtonAntd from "./SubmitButtonAntd";
import { useAppDispatch } from "@/redux/hooks/hook";
import { fileUploadsApi } from "@/redux/features/file-uploads/fileUploadsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { dynamicApi } from "@/redux/features/dynamic/dynamicApi";

type ApiResponse = {
  data?: any;
  success?: boolean;
  message?: string;
  error?: FetchBaseQueryError | SerializedError;
};

const FormAntd: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<(string | Blob) | null>(null);
  const [avatar, setAvatar] = useState<(string | Blob) | null>(null);

  const { TextArea } = Input;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    const { name, category, description, price, stock, manufacturer, routes } = values || {};

    try {
      const id: string = "65c3bfcde041c94a64c34999";
      const userDetailId = { userDetailId: id };

      const formData = new FormData();
      file && formData.append("file", file);
      formData.append("data", JSON.stringify(userDetailId));

      const avatarFormData = new FormData();
      avatar && avatarFormData.append("file", avatar);
      avatarFormData.append("data", JSON.stringify(userDetailId));

      const { data: cldResImageURL }: ApiResponse =
        (file &&
          id &&
          formData &&
          (await dispatch(fileUploadsApi.endpoints.insertSecureUrlIntoDB.initiate(formData)))) ||
        {};

      const { data: cldResAvatarURL }: ApiResponse =
        (avatar &&
          id &&
          avatarFormData &&
          (await dispatch(fileUploadsApi.endpoints.insertSecureUrlIntoDB.initiate(avatarFormData)))) ||
        {};

      const productDetails = {
        name: name,
        category: category,
        description: description,
        price: price,
        stock: stock,
        manufacturer: manufacturer,
        imageURL: cldResImageURL,
        avatarUrl: cldResAvatarURL,
      };

      routes &&
        cldResImageURL &&
        cldResAvatarURL &&
        productDetails &&
        (await dispatch(
          dynamicApi.endpoints.insertIntoDBDynamically.initiate({ url: routes, data: productDetails })
        ).then((res: ApiResponse) => {
          res?.data?.success === true ? toast.success(`${res?.data?.message}`) : toast.warning(`${res?.data?.message}`);
        }));
    } catch (err) {
      // do nothing
    }
  };

  return (
    <>
      <Form
        form={form}
        name="validateOnly"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800 }}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item name="routes" label="Routes" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="reagents">reagents</Select.Option>
            <Select.Option value="devices">devices</Select.Option>
            <Select.Option value="medicalEquipments">medicalEquipments</Select.Option>
            <Select.Option value="consumables">consumables</Select.Option>
            <Select.Option value="products">products</Select.Option>
            <Select.Option value="topProducts">topProducts</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          initialValue={"nameeee"}
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Product name is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="manufacturer" label="Manufacturer" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, type: "number", min: 1 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="stock" label="Stock" rules={[{ required: true, type: "number", min: 0 }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="ImageUrl" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true }]}>
          <UploadAntd setFile={setFile} placeholder="Upload Product Picture" />
        </Form.Item>
        <Form.Item label="AvatarUrl" valuePropName="fileList" getValueFromEvent={normFile}>
          <UploadAntd setFile={setAvatar} placeholder="Upload Logo of product" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <SubmitButtonAntd form={form}>Submit</SubmitButtonAntd>
          <Button danger htmlType="reset">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAntd;
