import { configureStore } from "@reduxjs/toolkit";

import clientReducer from "./reducers/clientSlice";
import prestamosReducer from "./reducers/prestamoSlice";
import pagosReducer from "./reducers/pagosSlice";


export const store = configureStore({
  reducer: {
    clientes: clientReducer,
    prestamos: prestamosReducer,
    pagos: pagosReducer,
  },
});
export type AppDispatch = typeof store.dispatch;

