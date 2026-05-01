import clockSettingsSlice from "../slices/clockSettingsSlice";
import clockStateSlice from "../slices/clockStateSlice";

export interface AppState {
  clockState: ReturnType<typeof clockStateSlice>;
  clockSettings: ReturnType<typeof clockSettingsSlice>;
}
