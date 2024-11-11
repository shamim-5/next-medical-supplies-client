"use client";

import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Form, Image, InputNumber, List, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import Error from "../shared/Error";
import useUserInfo from "@/hooks/useUserInfo";
import Comments from "./Comments";
import { useGetAllReviewsByIdQuery, useInsertIntoDBReviewsMutation } from "@/redux/features/reviews/reviewsApi";
import { useGetReagentDataByIdQuery } from "@/redux/features/reagents/reagentsApi";
import { useGetDevicesDataByIdQuery } from "@/redux/features/devices/devicesApi";
import { useGetProductsDataByIdQuery } from "@/redux/features/products/productsApi";
import { useGetMedicalEquipmentsDataByIdQuery } from "@/redux/features/medicalEquipments/medicalEquipmentsApi";
import { useGetConsumablesDataByIdQuery } from "@/redux/features/consumables/consumablesApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { dynamicApi } from "@/redux/features/dynamic/dynamicApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useGetDataByIdTopProductsQuery } from "@/redux/features/topProducts/topProductsApi";
import { addToCart } from "@/redux/features/cart-items/cartItemsSlice";

interface IProductDetailsProps {
  id: string | undefined;
}

type ApiResponse = {
  data?: any;
  success?: boolean;
  message?: string;
  error?: FetchBaseQueryError | SerializedError;
};

const ProductDetails: React.FC<IProductDetailsProps> = ({ id }) => {
  const { displayName, email } = useUserInfo();
  const [insertIntoDB] = useInsertIntoDBReviewsMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state) => state?.auth);

  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  let products: any[] = [];
  let productId = undefined;

  const {
    data: { data: topProductData } = { data: {} },
    isLoading: istTopProductLoading,
    isError: isTopProductError,
    error: topProductError,
  } = useGetDataByIdTopProductsQuery(id as string) || {};
  const {
    data: { data: reagentData } = { data: {} },
    isLoading: isReagentLoading,
    isError: isReagentError,
    error: reagentError,
  } = useGetReagentDataByIdQuery(id as string) || {};
  const {
    data: { data: deviceData } = { data: {} },
    isLoading: isDeviceLoading,
    isError: isDeviceError,
    error: deviceError,
  } = useGetDevicesDataByIdQuery(id as string) || {};
  const {
    data: { data: consumableData } = { data: {} },
    isLoading: isConsumableLoading,
    isError: isConsumableError,
    error: consumableError,
  } = useGetConsumablesDataByIdQuery(id as string) || {};
  const {
    data: { data: medicalEquipmentData } = { data: {} },
    isLoading: isMedicalEquipmentLoading,
    isError: isMedicalEquipmentError,
    error: medicalEquipmentError,
  } = useGetMedicalEquipmentsDataByIdQuery(id as string) || {};
  const {
    data: { data: productData } = { data: {} },
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useGetProductsDataByIdQuery(id as string) || {};

  const { data: { data: reviews } = [] } = useGetAllReviewsByIdQuery(id as string) || [];

  if (reagentData) {
    products.push(reagentData);
    sessionStorage.setItem("routes", "reagents");
  } else if (topProductData) {
    products.push(topProductData);
    sessionStorage.setItem("routes", "top-products");
  } else if (deviceData) {
    products.push(deviceData);
    sessionStorage.setItem("routes", "devices");
  } else if (consumableData) {
    products.push(consumableData);
    sessionStorage.setItem("routes", "consumables");
  } else if (medicalEquipmentData) {
    products.push(medicalEquipmentData);
    sessionStorage.setItem("routes", "medical-equipments");
  } else if (productData) {
    products.push(productData);
    sessionStorage.setItem("routes", "products");
  }

  // set array field name as  productId dinamically
  if (products.length) {
    const extractKeysEndingWithId = (array: any[]) => {
      return array.map((obj) => {
        const keysEndingWithId = Object.keys(obj).filter((key) => key.endsWith("Id"));
        return keysEndingWithId;
      });
    };

    // Usage
    const keysEndingWithIdArray = extractKeysEndingWithId(products);
    const flattenArray = keysEndingWithIdArray.flat();
    productId = flattenArray[0];
  }
  //   console.log(productId);

  const IconText = ({ icon, text }: { icon: React.FC; text: string | number }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const calculateAverageRatingAndCount = (reviews: IReview[]): { averageRating: number; numberOfReviews: number } => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.ceil(totalRatings / reviews.length);
    const numberOfReviews = reviews.length;

    return {
      averageRating,
      numberOfReviews,
    };
  };

  // decide what to render
  let content = null;

  if (isReagentLoading || isDeviceLoading || isConsumableLoading || isMedicalEquipmentLoading || isProductLoading) {
    content = <p className="m-2 text-center">Loading...</p>;
  } else if (
    (!isReagentLoading ||
      !isDeviceLoading ||
      !isConsumableLoading ||
      !isMedicalEquipmentLoading ||
      !isProductLoading) &&
    (isReagentError || isDeviceError || isConsumableError || isMedicalEquipmentError || isProductError)
  ) {
    const error: any = reagentError || deviceError || consumableError || medicalEquipmentError || productError;

    if ("message" in error) {
      content = (
        <div className="m-2 text-center">
          <Error message={error?.message} />
        </div>
      );
    }
  } else if (
    (!isReagentLoading ||
      !isDeviceLoading ||
      !isConsumableLoading ||
      !isMedicalEquipmentLoading ||
      !isProductLoading) &&
    (isReagentError || isDeviceError || isConsumableError || isMedicalEquipmentError || isProductError) &&
    products?.length === 0
  ) {
    content = <li className="m-2 text-center">No products found!</li>;
  } else if (
    (!isReagentLoading ||
      !isDeviceLoading ||
      !isConsumableLoading ||
      !isMedicalEquipmentLoading ||
      !isProductLoading) &&
    !(isReagentError || isDeviceError || isConsumableError || isMedicalEquipmentError || isProductError) &&
    products?.length > 0
  ) {
    const isExist = products?.filter((product: IProduct) => product?.id === (id as string));

    const dataSource: any[] = isExist?.map((product: IProduct, i: number) => ({
      id: `${product.id}`,
      avatar: `${product.avatarUrl}`,
      title: `${product.name}`,
      category: `${product.category}`,
      manufacturer: `${product.manufacturer}`,
      stock: `${product.stock}`,
      price: `${product.price}`,
      description: `${product.description}`,
      image: `${product.imageURL}`,
      reviews: calculateAverageRatingAndCount((reviews as IReview[]) || []),
    }));
    // add new review to reviews array
    const onFinish = (values: IReview) => {
      const newReview = {
        userName: displayName,
        email: email,
        rating: values.rating,
        comment: values?.comment || "",
        productId: id,
      };

      insertIntoDB(newReview);
      toast("Thanks for your feedback");
    };

    content = (
      <div>
        <List
          className=""
          itemLayout="vertical"
          size="large"
          dataSource={dataSource}
          renderItem={(item) => (
            <>
              <List.Item
                className="flex flex-col-reverse lg:flex-row"
                key={item.id}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text={
                      (item?.reviews as unknown as { averageRating: number; numberOfReviews: number })?.averageRating ||
                      "0"
                    }
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={
                      (item?.reviews as unknown as { averageRating: number; numberOfReviews: number })
                        ?.numberOfReviews || "0"
                    }
                    key="list-vertical-message"
                  />,
                ]}
                extra={<Image width={272} alt="logo" src={`${item.image}`} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={``}>{item.title}</a>}
                  description={
                    <div>
                      <h3>
                        Category: <span>{item.category}</span>
                      </h3>
                      <p>
                        Manufactured By: <span>{item.manufacturer}</span>
                      </p>
                      <p>
                        Available in Stock: <span>{item.stock} Pcs</span>
                      </p>
                      <p>
                        Price: <span>{item?.price} /=</span>
                      </p>
                    </div>
                  }
                />
                <p className="text-secondary/70 text-xs">{item.description}</p>
              </List.Item>
              {isReagentLoading ||
              isDeviceLoading ||
              isConsumableLoading ||
              isMedicalEquipmentLoading ||
              isProductLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <Form
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    className="border shadow-sm p-4 mb-4"
                  >
                    <Form.Item label="Rating" name="rating" rules={[{ required: true }]}>
                      <InputNumber min={1} max={5} step={0.5} />
                    </Form.Item>
                    <Form.Item label="Leave a comment" name="comment">
                      <TextArea rows={2} />
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                      <Button
                        disabled={
                          isReagentLoading ||
                          isDeviceLoading ||
                          isConsumableLoading ||
                          isMedicalEquipmentLoading ||
                          isProductLoading
                        }
                        type="primary"
                        ghost
                        htmlType="submit"
                        style={{ display: "inline-block" }}
                        className="bg-cyan-900/30 text-[#475466]"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
              <Space className="text-lg font-mono">Recent Comments :</Space>
              <Comments id={id as string} />
            </>
          )}
        />
      </div>
    );
  }

  const handleDetailsButton = () => {
    router.push(`/admin/store/${id}`);
  };

  const handleDeleteProduct = async () => {
    const path = sessionStorage.getItem("routes");
    try {
      id &&
        path &&
        (await dispatch(dynamicApi.endpoints.deleteByIdFromDBDynamically.initiate({ url: path, id })).then(
          (res: ApiResponse) => {
            res?.data?.success === true ? toast.success(`${res?.data?.message}`) : toast.error(`${res?.data?.message}`);
            router.push(`/${path}`);
          }
        ));
    } catch (err) {
      // do nothing
    }
  };

  const handleButtonClick = () => {
    dispatch(addToCart(products[0]));
    router.push("/user/cart-items");
    toast.success("Add to cart success");
  };

  return (
    <div>
      <h2 className="text-primary-dark text-2xl md:text-3xl lg:text-4xl uppercase font-semibold mb-4">
        Product Details{" "}
        {admin ? (
          <>
            <Button onClick={handleDetailsButton} type="primary" size="small" ghost>
              Edit
            </Button>
            <Button onClick={handleDeleteProduct} type="primary" size="small" danger ghost className="ml-2">
              Delete
            </Button>
          </>
        ) : (
          <Button onClick={handleButtonClick} type="primary" size="small" ghost htmlType="submit">
            Add to cart
          </Button>
        )}
      </h2>

      <div className="my-2">{content}</div>
    </div>
  );
};

export default ProductDetails;
