import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICartItems {
  _id: string;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
  manufacturer?: string;
  imageURL?: string;
  avatarUrl?: string;
  quantity?: number;

  reviews: IReview[];
}

const initialState: ICartItems[] = [];

const cartItemsSlice = createSlice({
  name: "cart-items",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItems>) => {
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 1;
      } else {
        const newItem: ICartItems = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
        };
        state.push(newItem);
      }
    },
    removeQuantity: (state, action: PayloadAction<ICartItems>) => {
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem && existingItem.quantity !== 0) {
        existingItem.quantity = existingItem.quantity ? existingItem.quantity - 1 : 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove item from the cart based on the _id
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, removeQuantity } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
