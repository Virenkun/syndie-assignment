import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { leadsApi } from "@/lib/leads-api";
import { conversationsApi } from "@/lib/conversations-api";

export const store = configureStore({
  reducer: {
    [leadsApi.reducerPath]: leadsApi.reducer,
    [conversationsApi.reducerPath]: conversationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(leadsApi.middleware)
      .concat(conversationsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
