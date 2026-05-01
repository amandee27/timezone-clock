import { CountryTimeStamp } from "./CountryTimeStamp";
import { PersistedSettings } from "./PersistedSettings";

export interface PersistedAppState {
  timezoneList: CountryTimeStamp[];
  clockSettings: PersistedSettings;
}
