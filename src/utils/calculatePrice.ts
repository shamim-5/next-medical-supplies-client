export default function CalculatePrice(record: any[] | readonly IProduct[]) {
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
  const discountPercentage: number = record?.[0]?.discountPercentage || 0;
  const finalPrice = applyDiscount(totalPrice, discountPercentage);

  return {
    totalPrice,
    finalPrice,
  };
}
