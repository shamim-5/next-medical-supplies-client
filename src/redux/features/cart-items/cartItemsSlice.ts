import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICartItems {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  imageURL: string;
  avatarUrl: string;
  quantity?: number;
  priceTotal?: number;
  discountPercentage?: number;

  reviews?: IReview[];
}

const initialState: ICartItems[] = [];

const cartItemsSlice = createSlice({
  name: "cart-items",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItems>) => {
      const existingItem = state.find((item: { id: string }) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 1;
        existingItem.priceTotal = existingItem.price
          ? Math.round(existingItem.price) * existingItem.quantity
          : existingItem.price;
      } else {
        const newItem: ICartItems = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
          priceTotal: Math.round(action.payload.price as number) || 0,
          discountPercentage: Number(process.env.NEXT_PUBLIC_DISCOUNT) || 0,
        };
        state.push(newItem);
      }
    },

    removeQuantity: (state, action: PayloadAction<ICartItems>) => {
      const existingItem = state.find((item: { id: string }) => item.id === action.payload.id);
      if (existingItem && existingItem.quantity !== 0) {
        existingItem.quantity = existingItem.quantity ? existingItem.quantity - 1 : 1;
        existingItem.priceTotal = existingItem.price
          ? Math.round(existingItem.price) * existingItem.quantity
          : existingItem.price;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove item from the cart based on the id
      return state.filter((item: { id: string }) => item.id !== action.payload);
    },

    // clear existing cart-items state replace with empty array
    clearCartItems: (state) => {
      return [];
    },

    // modify cart items -- replace with records
    modifyCartItems: (state, action: PayloadAction<ICartItems[]>) => {
      return (state = action.payload);
    },
  },
});

export const { addToCart, removeFromCart, removeQuantity, clearCartItems, modifyCartItems } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
