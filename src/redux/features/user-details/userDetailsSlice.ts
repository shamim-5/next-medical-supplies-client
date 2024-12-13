import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  userName: string | undefined | null;
  email: string | undefined | null;
  userId: string | undefined | null;
}

const initialState: IInitialState = {
  userName: undefined,
  email: undefined,
  userId: undefined,
};

const userDetailsSlice = createSlice({
  name: "user-details",
  initialState,
  reducers: {
    userDetails: (state, action: PayloadAction<IInitialState>) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
  },
});

export const { userDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
