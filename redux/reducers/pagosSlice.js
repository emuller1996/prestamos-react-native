import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPagosService } from "../../services/pagos.services";

export const getAllPagosRedux = createAsyncThunk("pagos/fetch", async (s) => {
  try {
    const t = await getPagosService();
    return t.data;
  } catch (error) {
    console.log(error);
  }
});

export const pagosSlice = createSlice({
  name: "pagos",
  initialState: {
    pagos: [],
    loading: false,
    error: null,
  },
  reducers: {
    SetPagos: (state, action) => {
      return { ...state, pagos: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPagosRedux.fulfilled, (state, action) => {
      state.pagos = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllPagosRedux.pending, (state, action) => {
      state.loading = true;
      state.pagos = [];
    });
    builder.addCase(getAllPagosRedux.rejected, (state, action) => {
      state.loading = false;
      state.pagos = [];
      state.error = action.payload.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { SetPagos } = pagosSlice.actions;

export default pagosSlice.reducer;
