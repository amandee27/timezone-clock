import React, { useEffect, useState } from "react";
import SettingsContext from "./SettingsContexts";
import { ClockSettings } from "../Interfaces/ClockSettings";
import { defaultSettings } from "./SettingsContexts";
import { clockPhases } from "../data/clockPhases";

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [clockSettings, setClockSettings] = useState<ClockSettings>(
    defaultSettings.clockSettings
  );

  useEffect(() => {
    const clockSettingItem = localStorage.getItem("clockSettings");
    const clockSettingsObj = clockSettingItem && JSON.parse(clockSettingItem);

    if (clockSettingsObj) {
      const savedKey = clockSettingsObj["clockThemeKey"];
      const theme =
        clockPhases.find((t) => t.key === savedKey) ?? clockPhases[0];
      const loaded: ClockSettings = {
        theme,
        showNumbers: clockSettingsObj["showNumbers"],
        darkMode: clockSettingsObj["darkMode"] ?? true,
      };
      setClockSettings(loaded);
      applyDarkMode(loaded.darkMode);
    } else {
      localStorage.setItem(
        "clockSettings",
        JSON.stringify({
          clockThemeKey: clockSettings.theme.key,
          showNumbers: clockSettings.showNumbers,
          darkMode: clockSettings.darkMode,
        })
      );
      applyDarkMode(clockSettings.darkMode);
    }
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
        clockSettings,
        updateSettings: ({ theme, showNumbers, darkMode }: ClockSettings) => {
          const updated = { theme, showNumbers, darkMode };
          setClockSettings(updated);
          applyDarkMode(darkMode);
          localStorage.setItem(
            "clockSettings",
            JSON.stringify({
              clockThemeKey: theme.key,
              showNumbers: showNumbers,
              darkMode: darkMode,
            })
          );
        },
      }}
    >
      {children}
    </SettingsContext>
  );
}

export default SettingsProvider;
