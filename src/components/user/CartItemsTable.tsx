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

const CartItemsTable: React.FC = () => {
  const products = useAppSelector((state) => state?.cartItems) || [];
  const { uid, displayName, email } = useUserInfo() || {};
  const [addToDB] = useAddToDBMutation();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const columns: ColumnsType<IProduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
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
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            title={() => (
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2">Items that you want to buy</h2>
                </div>
                <div>
                  <Space size="middle" className="w-full cursor-pointer">
                    <a onClick={() => router.push("/all-items")}>
                      Add More <PlusCircleOutlined className="text-blue-500/90 text-xl text-center" />
                    </a>
                  </Space>
                </div>
              </div>
            )}
            footer={(record) => {
              const calculateTotalPrice = (record: any[] | readonly IProduct[]) => {
                if (!record || record.length === 0) {
                  return 0;
                }

                const totalPriceFloat = record.reduce((sum: number, obj: IRecord) => sum + (obj.priceTotal || 0), 0);
                return Math.floor(totalPriceFloat);
              };

              const applyDiscount = (totalPrice: number, discountPercentage: number) => {
                const discount = (totalPrice * discountPercentage) / 100;
                const discountPrice = totalPrice - discount;
                return { discountPrice: Math.floor(discountPrice), discount: discount };
              };

              const totalPrice: number = calculateTotalPrice(record);
              const discountPercentage: number = 10;

              const finalPrice = applyDiscount(totalPrice, discountPercentage);

              const handleClick = async () => {
                const items = {
                  userId: uid?.toString(),
                  userName: displayName,
                  email: email,
                  status: false,
                  active: false,
                  paid: false,
                  timestamp: Date.now().toString(),
                  order: [...record],
                };

                try {
                  await addToDB(items);
                  router.push("/user/manage-orders");
                  toast.success("Thanks for your order. You will receive confirmation message soon.");
                } catch (error) {
                  // do nothing
                }
              };

              return (
                <div>
                  <div className="flex justify-end">
                    <h2 className="mr-9 w-[200px] text-end text-slate-900/70">Total Price :</h2>
                    <div className="mr-4 lg:mr-6 w-[100px]">
                      <div className="">{totalPrice}.00 /=</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <h2 className="mr-9 w-[200px] text-end text-slate-900/70">10% Discount :</h2>
                    <div className="mr-4 lg:mr-6 w-[100px]">
                      <div className=""> - {finalPrice?.discount} /=</div>
                      <Divider className="mt-2 mb-3" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <h2 className="mr-9 w-[200px] text-end">Payable Amount :</h2>
                    <div className="mr-4 lg:mr-6 w-[100px]">
                      <div className="">{finalPrice?.discountPrice}.00 /=</div>
                    </div>
                  </div>
                  <div className="flex justify-end mr-4 lg:mr-6">
                    <ButtonShake onClick={handleClick}>Place an Order</ButtonShake>
                  </div>
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
