import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  status?: boolean | undefined;
}

const initialState: IInitialState = {
  status: true,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
