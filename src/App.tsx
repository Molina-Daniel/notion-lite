import { Route, Routes } from "react-router-dom";
import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { Auth } from "./auth/Auth";
import { Private } from "./auth/Private";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
