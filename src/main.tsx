import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { initializeStore } from "./store.tsx";
import { saveState } from "./localStorage.tsx";
import SettingsProvider from "./Contexts/SettingsProvider.tsx";

(async () => {
  const store = await initializeStore();
  store.subscribe(() => {
    saveState(store.getState().clockState.timezoneList);
  });
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider store={store}>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </Provider>
    </BrowserRouter>,
  );
})();
