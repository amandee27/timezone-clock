import { configureStore } from "@reduxjs/toolkit";
import clockStateSlice from "./slices/clockStateSlice.tsx";
import clockSettingsSlice from "./slices/clockSettingsSlice.tsx";
import { loadStateNew } from "./localStorage.tsx";
import { AppState } from "./Interfaces/AppState.tsx";

async function initializeStore() {
  const persistedState = await loadStateNew();

  return configureStore<AppState>({
    reducer: {
      clockState: clockStateSlice,
      clockSettings: clockSettingsSlice,
    },
    preloadedState: persistedState,
  });
}

export { initializeStore };
