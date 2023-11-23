import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllClientesService } from "../../services/clientes";

export const getAllClientesRedux = createAsyncThunk(
  "clientes/fetch",
  async (s) => {
    try {
      const t = await getAllClientesService();
      return t.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const clientSlice = createSlice({
  name: "clientes",
  initialState: {
    clientes: [],
    loading: false,
    error: null,
  },
  reducers: {
    SetClientes: (state, action) => {
      return { ...state, clientes: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClientesRedux.fulfilled, (state, action) => {
      state.clientes = action.payload;
      state.loading =false
    })

    builder.addCase(getAllClientesRedux.pending, (state, action) => {
      state.loading = true;
      state.clientes = [];

    })
    builder.addCase(getAllClientesRedux.rejected, (state, action) => {
      state.loading = false;
      state.clientes = [];
      state.error = action.payload.error.message;
    })
  },
});

// Action creators are generated for each case reducer function
export const { SetClientes } = clientSlice.actions;

export default clientSlice.reducer;
