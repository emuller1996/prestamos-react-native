import { createSlice } from "@reduxjs/toolkit";

export const prestamoSlice = createSlice({
  name: "prestamos",
  initialState: [],
  reducers: {
    SetPrestamos: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetPrestamos } = prestamoSlice.actions;

export default prestamoSlice.reducer;
