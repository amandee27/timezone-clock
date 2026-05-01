import moment from "moment";
import { CountryTimeStamp } from "./Interfaces/CountryTimeStamp";
import { ClockPhase } from "./Interfaces/ClockPhase";
import { clockPhases } from "./data/clockPhases";
import { AppState } from "./Interfaces/AppState";
import { PersistedAppState } from "./Interfaces/PersistedAppState";

const localtimezone = moment.tz.guess();
const offsetHours = moment.tz(localtimezone).utcOffset() / 60;

const defaultTimezoneList: CountryTimeStamp[] = [
  {
    id: "local",
    value: localtimezone,
    label: (localtimezone.match(/[^/]+$/) || [])[0] + " (local)",
    offset: `(UTC${offsetHours >= 0 ? "+" : ""}${offsetHours})`,
  },
];

const defaultPersistedState: PersistedAppState = {
  timezoneList: defaultTimezoneList,
  clockSettings: {
    clockThemeKey: clockPhases[0].key,
    showNumbers: false,
    darkMode: true,
  },
};

function toReduxState(persisted: PersistedAppState) {
  const theme = (clockPhases.find(
    (t) => t.key === persisted.clockSettings.clockThemeKey,
  ) ?? clockPhases[0]) as unknown as ClockPhase;
  return {
    clockState: { timezoneList: persisted.timezoneList },
    clockSettings: {
      settings: {
        theme,
        showNumbers: persisted.clockSettings.showNumbers,
        darkMode: persisted.clockSettings.darkMode,
      },
    },
  };
}

function toPersistedState(state: AppState): PersistedAppState {
  return {
    timezoneList: state.clockState.timezoneList,
    clockSettings: {
      clockThemeKey: state.clockSettings.settings.theme.key,
      showNumbers: state.clockSettings.settings.showNumbers,
      darkMode: state.clockSettings.settings.darkMode,
    },
  };
}

export const loadStateNew = async (): Promise<AppState | undefined> => {
  try {
    if (window.location.protocol === "chrome-extension:") {
      const result = await chrome.storage.sync.get("appState");

      if (result.appState) {
        return toReduxState(result.appState as PersistedAppState);
      }

      // Nothing in chrome storage — try localStorage as fallback
      const localData = localStorage.getItem("appState");
      if (localData) {
        const parsed = JSON.parse(localData) as PersistedAppState;
        await chrome.storage.sync.set({ appState: parsed });
        return toReduxState(parsed);
      }

      // No saved state anywhere — save defaults and return them
      await chrome.storage.sync.set({ appState: defaultPersistedState });
      return toReduxState(defaultPersistedState);
    } else {
      const localData = localStorage.getItem("appState");
      if (localData) {
        return toReduxState(JSON.parse(localData) as PersistedAppState);
      }
      return toReduxState(defaultPersistedState);
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state: AppState) => {
  try {
    const persisted = toPersistedState(state);
    if (window.location.protocol === "chrome-extension:") {
      chrome.storage.sync.set({ appState: persisted });
    } else {
      localStorage.setItem("appState", JSON.stringify(persisted));
    }
  } catch (err) {
    console.log(err);
  }
};
