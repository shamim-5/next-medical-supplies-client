import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const medicalEquipments = createSlice({
  name: "medical-equipments",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = medicalEquipments.actions;
export default medicalEquipments.reducer;
