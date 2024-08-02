"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Input, InputNumber, Select } from "antd";
import UploadAntd from "../shared/UploadAntd";
import { useAppDispatch } from "@/redux/hooks/hook";
import { fileUploadsApi } from "@/redux/features/file-uploads/fileUploadsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { dynamicApi, useGetDataByIdDynamicallyQuery } from "@/redux/features/dynamic/dynamicApi";

type ApiResponse = {
  data?: any;
  success?: boolean;
  message?: string;
  error?: FetchBaseQueryError | SerializedError;
};

interface IFormAntdPatchProps {
  id: string | undefined;
  routes: string | null | undefined;
}

const FormAntdPatch: React.FC<IFormAntdPatchProps> = ({ id, routes }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<(string | Blob) | null>(null);
  const [avatar, setAvatar] = useState<(string | Blob) | null>(null);

  const { data: { data: getData } = { data: {} }, isLoading } =
    useGetDataByIdDynamicallyQuery({ url: routes, id: id }) || {};

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
    const { name, category, description, price, stock, manufacturer } = values || {};

    try {
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
        imageURL: cldResImageURL || getData?.imageURL,
        avatarUrl: cldResAvatarURL || getData?.avatarUrl,
      };

      routes &&
        (cldResImageURL || getData?.imageURL) &&
        (cldResAvatarURL || getData?.avatarUrl) &&
        productDetails &&
        (await dispatch(
          dynamicApi.endpoints.updateOneInDBDynamically.initiate({ url: routes, id, data: productDetails })
        ).then((res: ApiResponse) => {
          res?.data?.success === true ? toast.success(`${res?.data?.message}`) : toast.error(`${res?.data?.message}`);
        }));
    } catch (err) {
      // do nothing
    }
  };

  return (
    routes &&
    id &&
    !isLoading &&
    getData !== undefined &&
    getData && (
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
          <Form.Item initialValue={`${routes}`} name="routes" label="Routes" rules={[{ required: true }]}>
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
            initialValue={`${getData.name}`}
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Product name is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={`${getData.manufacturer}`}
            name="manufacturer"
            label="Manufacturer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item initialValue={`${getData.category}`} name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={`${getData.description}`}
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            initialValue={`${parseFloat(getData.price)}`}
            name="price"
            label="Price"
            rules={[{ required: true, type: "number", min: 1 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            initialValue={`${parseFloat(getData.stock)}`}
            name="stock"
            label="Stock"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="ImageUrl" valuePropName="fileList" getValueFromEvent={normFile}>
            <UploadAntd setFile={setFile} placeholder="Upload Product Picture" />
          </Form.Item>
          <Form.Item label="AvatarUrl" name="aa" valuePropName="fileList" getValueFromEvent={normFile}>
            <UploadAntd setFile={setAvatar} placeholder="Upload Logo of product" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-gradient-to-l hover:bg-gradient-to-b from-primary/90 to-primary/70 hover:text-slate-900 mr-4"
            >
              Update
            </Button>
            <Button danger htmlType="reset">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  );
};

export default FormAntdPatch;
