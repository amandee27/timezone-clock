import { useContext } from "react";
import SearchBar from "./SearchBar/SearchBar";
import RightDropDown from "./RightDropDown/RightDropDown";
import Logo from "./Logo/Logo";
import SettingsContext from "../../Contexts/SettingsContexts";

export default function Navbar({
  addClock,
}: {
  addClock: (zone: { value: string; label: string; offset: string }) => void;
}) {
  const settings = useContext(SettingsContext);
  const isDark = settings.clockSettings.darkMode;

  const toggleDarkMode = () => {
    settings.updateSettings?.({
      ...settings.clockSettings,
      darkMode: !isDark,
    });
  };

  return (
    <nav className="w-full bg-transparent text-slate-800 dark:text-white px-4 py-3 flex items-center justify-between">
      <div className="flex flex-wrap w-full gap-4 items-stretch">
        <div className="flex-1 min-w-[120px] flex items-center text-left order-1">
          <Logo />
        </div>
        <div className="flex-1 min-w-[120px] flex justify-end items-center gap-2 order-2 md:order-3">
          <button
            onClick={toggleDarkMode}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? (
              // Sun icon — shown in dark mode, click to go light
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
              </svg>
            ) : (
              // Moon icon — shown in light mode, click to go dark
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <RightDropDown />
        </div>
        <div className="w-full text-center flex items-center justify-center order-3 md:order-2 md:flex-1 md:w-auto">
          <SearchBar addClock={addClock} />
        </div>
      </div>
    </nav>
  );
}
