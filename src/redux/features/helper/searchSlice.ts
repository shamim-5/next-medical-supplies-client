import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  field?: string | undefined;
  searchTerm: string | undefined;
}

const initialState: IInitialState = {
  field: "",
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.field = action.payload.field;
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
