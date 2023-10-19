import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPathItemSlice {
  path: string;
}

const initialState: IPathItemSlice = {
  path: "/",
};
const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<IPathItemSlice>) => {
      state.path = action.payload.path;
    },
    cleanPath: (state) => {
      state.path = "/";
    },
  },
});

export const { setPath, cleanPath } = pathSlice.actions;
export default pathSlice.reducer;
