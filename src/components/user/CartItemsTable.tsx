/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { Divider, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { addToCart, removeFromCart, removeQuantity } from "@/redux/features/cart-items/cartItemsSlice";
import { toast } from "react-toastify";
import EmptyData from "../shared/EmptyData";
import ButtonShake from "../shared/ButtonShake";
import { useAddToDBMutation } from "@/redux/features/cart-items/cartItemsApi";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { PlusCircleOutlined } from "@ant-design/icons";
import useUserPick from "@/hooks/useUserPick";

const CartItemsTable: React.FC = () => {
  const userDetails = useAppSelector((state) => state?.userDetails || {});
  const products = useAppSelector((state) => state?.cartItems) || [];
  const { uid, displayName, email } = useUserInfo() || {};
  const [addToDB] = useAddToDBMutation();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const columns: ColumnsType<IProduct> = [
    {
      title: "S/N",
      key: "id",
      rowScope: "row",
      render: (_, _record, index) => <Space>{index + 1}</Space>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a className="line-clamp-1">{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <span className="line-clamp-1">{text}</span>,
      responsive: ["lg"],
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
      render: (text) => <span className="line-clamp-1">{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "priceTotal",
      key: "priceTotal",
      render: (text) => <span className="">{Math.round(Number(text))}.00/=</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const handleDelete = () => {
          dispatch(removeFromCart(record.id));
          toast.warning("Delete from cart success");
        };
        const handleAddQuantity = () => {
          dispatch(addToCart(record));
          toast.success("Quantity and Price Updated");
        };
        const handleRemoveQuantity = () => {
          dispatch(removeQuantity(record));
          toast.warning("Quantity and Price Updated");
        };

        return (
          <Space size="middle" className="w-full">
            <a onClick={handleAddQuantity}>(+)</a>
            <a onClick={handleRemoveQuantity}>(-)</a>
            <a onClick={handleDelete}>Delete</a>
          </Space>
        );
      },
    },
  ];

  const data: IProduct[] = [...products];

  return (
    <div>
      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName={() => "leading-none"}
            title={() => (
              <div className="">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Cart Items</h2>
                  </div>
                  <div>
                    <Space size="middle" className="w-full cursor-pointer my-1 md:my-0 leading-5">
                      <a onClick={() => router.push("/all-items")}>
                        <span className="hidden lg:inline mr-1">Add More</span>
                        <PlusCircleOutlined className="text-blue-500/90 text-xl text-center" />
                      </a>
                    </Space>
                  </div>
                </div>
              </div>
            )}
            footer={(record) => {
              const calculateTotalPrice = (record: any[] | readonly IProduct[]) => {
                if (!record || record.length === 0) {
                  return 0;
                }

                const totalPriceFloat = record.reduce((sum: number, obj: IRecord) => sum + (obj.priceTotal || 0), 0);
                return Math.round(totalPriceFloat);
              };

              const applyDiscount = (totalPrice: number, discountPercentage: number) => {
                const discount = (totalPrice * discountPercentage) / 100;
                const discountPrice = totalPrice - discount;
                return { discountPrice: Math.round(discountPrice), discount: Math.round(discount) };
              };

              const totalPrice: number = calculateTotalPrice(record);
              const discountPercentage: number = record?.[0]?.discountPercentage || 0;

              const finalPrice = applyDiscount(totalPrice, discountPercentage);

              const handleClick = async () => {
                const items = {
                  userId: !userDetails?.userId ? uid?.toString() : userDetails?.userId,
                  userName: !userDetails?.userName ? displayName : userDetails?.userName,
                  email: !userDetails?.email ? email : userDetails?.email,
                  status: false,
                  active: false,
                  paid: false,
                  timestamp: Date.now().toString(),
                  order: [...record],
                };

                try {
                  await addToDB(items);
                  router.push("/user/manage-orders");
                  toast.success("Thanks for your order.");
                } catch (error) {
                  // do nothing
                }
              };

              return (
                <div>
                  <div className="flex flex-col-reverse gap-2 lg:flex-row">
                    <div></div>

                    <div className="ml-auto">
                      <div className="flex justify-start">
                        <h2 className="mr-2 lg:mr-9 w-[150px] text-end">Total Price :</h2>
                        <div className="ml-auto">
                          <div className="whitespace-nowrap">{totalPrice}.00 /=</div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <h2 className="mr-2 lg:mr-9 w-[150px] text-end">
                          Discount {discountPercentage >= 1 && `${discountPercentage}%`} :
                        </h2>
                        <div className="ml-auto">
                          <div className="whitespace-nowrap "> - {finalPrice?.discount}.00 /=</div>
                          <Divider className="mt-1 mb-2" />
                        </div>
                      </div>
                      <div className="flex justify-start font-semibold">
                        <h2 className="mr-2 lg:mr-9 w-[150px] text-end">Payable Amount :</h2>
                        <div className="ml-auto">
                          <div className="whitespace-nowrap">{finalPrice?.discountPrice}.00 /=</div>
                        </div>
                      </div>
                      <Divider className="mt-2" />
                      <div className="flex justify-evenly lg:justify-end mr-9 lg:mr-0">
                        <ButtonShake onClick={handleClick}>Place an Order</ButtonShake>
                      </div>
                    </div>
                  </div>
                  <Divider className="mt-1 lg:mt-2 mb-0" />
                </div>
              );
            }}
            rowKey="id"
          />
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default CartItemsTable;
