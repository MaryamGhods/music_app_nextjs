import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./features/playerSlice";
import { coreApi } from "./services/api";

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer,
    player: playerSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coreApi.middleware),
});