import React, { useEffect } from "react";
import SettingsContext from "./SettingsContexts";
import { ClockSettings } from "../Interfaces/ClockSettings";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../Interfaces/AppState";
import {
  ClockSettingsState,
  updateSettings,
} from "../slices/clockSettingsSlice";

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const clockSettings = useSelector<AppState, ClockSettingsState>(
    (state) => state.clockSettings,
  );
  const dispatch = useDispatch();

  /**No need to set default,  because redux store will initialize with default settings,
   * and this useEffect will load from storage on app start. If you want to reset to default,
   * you can dispatch updateSettings with default values. Need to apply dark mode on initial load.*/
  useEffect(() => {
    applyDarkMode(clockSettings.settings.darkMode);
  }, []);

  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <SettingsContext
      value={{
        clockSettings: clockSettings.settings,
        updateSettings: ({ theme, showNumbers, darkMode }: ClockSettings) => {
          // Dispatch an action to update the Redux store with the new settings
          const updated = { theme, showNumbers, darkMode };
          dispatch(updateSettings(updated));
          applyDarkMode(darkMode);
        },
      }}
    >
      {children}
    </SettingsContext>
  );
}

export default SettingsProvider;
