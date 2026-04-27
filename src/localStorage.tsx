import moment from "moment";
import { CountryTimeStamp } from "./Interfaces/CountryTimeStamp";
const localtimezone = moment.tz.guess();
const offsetHours = moment.tz(localtimezone).utcOffset() / 60;

export const loadState = () => {
  try {
    const list = localStorage.getItem("timeZoneList");
    let timezoneList: CountryTimeStamp[] = [];
    if (list === null) {
      timezoneList = [
        {
          id: "local",
          value: localtimezone,
          label: (localtimezone.match(/[^/]+$/) || [])[0] + " (local)",
          offset: `(UTC${offsetHours >= 0 ? "+" : ""}${offsetHours})`,
        },
      ];
    } else {
      timezoneList = JSON.parse(list);
    }

    return {
      clockState: { timezoneList },
    };
  } catch (err) {
    return undefined;
  }
};

export const loadStateNew = async () => {
  if (window.location.protocol === "chrome-extension:") {
    const result = await chrome.storage.sync.get("timeZoneList");
    if (result.timeZoneList !== undefined) {
      return {
        clockState: { timezoneList: result.timeZoneList as CountryTimeStamp[] },
      };
    }
    const localData = localStorage.getItem("timeZoneList");
    if (localData) {
      const parsedList = JSON.parse(localData) as CountryTimeStamp[];
      await chrome.storage.sync.set({ timeZoneList: parsedList });
      return { clockState: { timezoneList: parsedList } };
    }
    const defaultList = [
      {
        id: "local",
        value: localtimezone,
        label: (localtimezone.match(/[^/]+$/) || [])[0] + " (local)",
        offset: `(UTC${offsetHours >= 0 ? "+" : ""}${offsetHours})`,
      },
    ];
    await chrome.storage.sync.set({ timeZoneList: defaultList });
    return { clockState: { timezoneList: defaultList } };
  } else {
    // sync
    return loadState();
  }
};

export const saveState = (state: CountryTimeStamp[]) => {
  try {
    const clockState = JSON.stringify(state);
    if (window.location.protocol === "chrome-extension:") {
      chrome.storage.sync.set({ timeZoneList: state });
    } else {
      localStorage.setItem("timeZoneList", clockState);
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
