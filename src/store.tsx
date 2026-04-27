import { configureStore } from "@reduxjs/toolkit";
import clockStateSlice from "./slices/clockStateSlice.tsx";
import { loadStateNew } from "./localStorage.tsx";

export type AppState = {
  clockState: ReturnType<typeof clockStateSlice>;
};

async function initializeStore() {
  const persistedState = await loadStateNew();

  return configureStore<AppState>({
    reducer: {
      clockState: clockStateSlice,
    },
    preloadedState: persistedState,
  });
}

export { initializeStore };
