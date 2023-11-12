import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPrestamosService } from "../../services/prestamos.services";


export const getAllPrestamosRedux = createAsyncThunk(
  "prestamos/fetch",
  async (s) => {
    try {
      const t = await getAllPrestamosService();
      return t.data;
    } catch (error) {}
  }
);
export const prestamoSlice = createSlice({
  name: "prestamos",
  initialState:{
    prestamos: [],
    loading: false,
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPrestamosRedux.fulfilled, (state, action) => {
      state.prestamos = action.payload;
      state.loading =false
    })

    builder.addCase(getAllPrestamosRedux.pending, (state, action) => {
      state.loading = true;
      state.prestamos = [];

    })
    builder.addCase(getAllPrestamosRedux.rejected, (state, action) => {
      state.loading = false;
      state.prestamos = [];
      state.error = action.payload.error.message;
    })
  }

});

// Action creators are generated for each case reducer function
export const { SetPrestamos } = prestamoSlice.actions;

export default prestamoSlice.reducer;
