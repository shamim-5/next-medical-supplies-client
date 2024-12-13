export default function CalculatePrice(record: any[] | readonly IProduct[]) {
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

  return {
    totalPrice,
    finalPrice,
    discountPercentage,
  };
}
