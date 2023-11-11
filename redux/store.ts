import { configureStore } from "@reduxjs/toolkit";

import clientReducer from "./reducers/clientSlice";
import prestamosReducer from "./reducers/prestamoSlice";


export const store = configureStore({
  reducer: {
    clientes: clientReducer,
    prestamos: prestamosReducer,
  },
});
export type AppDispatch = typeof store.dispatch;

