import { createSlice } from "@reduxjs/toolkit";
import { ClockSettings } from "../Interfaces/ClockSettings";
import { clockPhases } from "../data/clockPhases";
import { ClockPhase } from "../Interfaces/ClockPhase";

interface ClockSettingsState {
  settings: ClockSettings;
}

const initialState: ClockSettingsState = {
  settings: {
    theme: clockPhases[0] as ClockPhase,
    showNumbers: false,
    darkMode: true,
  } as ClockSettings,
};

const clockSettingsSlice = createSlice({
  name: "clockSettings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { updateSettings } = clockSettingsSlice.actions;
export default clockSettingsSlice.reducer;
export type { ClockSettingsState };
